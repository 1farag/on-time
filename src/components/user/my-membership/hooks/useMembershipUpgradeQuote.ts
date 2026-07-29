import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

const UPGRADE_QUOTE_PATH = "/privileges/membership/upgrade-quote";

export type UpgradeQuoteLineHighlight = "credit" | "gold";

export type UpgradeQuoteLine = {
  label: string;
  value: string;
  highlight?: UpgradeQuoteLineHighlight;
};

export type NormalizedUpgradeQuoteOption = {
  title: string;
  description: string;
  rows: UpgradeQuoteLine[];
  total?: { label: string; value: string };
};

export type MembershipUpgradeQuoteData = {
  newPlan: NormalizedUpgradeQuoteOption;
  remainingPeriod: NormalizedUpgradeQuoteOption;
};

/** Default copy when API omits fields (matches previous static UI). */
export const MEMBERSHIP_UPGRADE_QUOTE_DEFAULTS: MembershipUpgradeQuoteData = {
  newPlan: {
    title: "Upgrade + Start a new plan",
    description:
      "Start a new 12-month subscription with all the benefits of the upgraded plan.",
    rows: [
      { label: "New Term", value: "12 Month" },
      { label: "Price", value: "4,999 SAR" },
      { label: "Balance Due", value: "-3500 SAR", highlight: "credit" },
    ],
    total: { label: "Total", value: "3500 SAR" },
  },
  remainingPeriod: {
    title: "Upgrade for the remaining period",
    description:
      "Complete your current subscription with enhanced benefits for the remaining period only.",
    rows: [
      { label: "Time remaining", value: "6 Month" },
      { label: "Upgrade cost", value: "2000 SAR", highlight: "gold" },
    ],
  },
};

function unwrapPayload(payload: unknown): Record<string, unknown> | null {
  const o =
    payload && typeof payload === "object" ? (payload as Record<string, unknown>) : null;
  if (!o) return null;
  if (
    "data" in o &&
    o.data !== null &&
    typeof o.data === "object" &&
    !Array.isArray(o.data)
  ) {
    return o.data as Record<string, unknown>;
  }
  return o;
}

function coerceString(v: unknown): string | undefined {
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return undefined;
}

function lineHighlight(
  raw: Record<string, unknown>
): UpgradeQuoteLineHighlight | undefined {
  const v = coerceString(raw.variant ?? raw.highlight ?? raw.tone ?? raw.style)?.toLowerCase();
  if (v === "credit" || v === "balance" || v === "negative" || v === "deduction") {
    return "credit";
  }
  if (v === "gold" || v === "primary" || v === "accent") {
    return "gold";
  }
  return undefined;
}

function parseLine(raw: unknown): UpgradeQuoteLine | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const label = coerceString(o.label ?? o.title ?? o.key ?? o.name)?.trim();
  const value = coerceString(o.value ?? o.amount ?? o.text ?? o.display)?.trim();
  if (!label && !value) return null;
  const highlight = lineHighlight(o);
  return {
    label: label || "—",
    value: value || "—",
    ...(highlight ? { highlight } : {}),
  };
}

function parseRows(raw: unknown): UpgradeQuoteLine[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const lines = raw.map(parseLine).filter(Boolean) as UpgradeQuoteLine[];
  return lines.length ? lines : undefined;
}

function parseTotal(
  obj: Record<string, unknown>
): { label: string; value: string } | undefined {
  const value = coerceString(
    obj.total ?? obj.totalValue ?? obj.totalAmount ?? obj.payable ?? obj.amountDue
  );
  if (!value) return undefined;
  return {
    label: coerceString(obj.totalLabel) ?? "Total",
    value,
  };
}

function parseQuoteOption(obj: Record<string, unknown>): Partial<NormalizedUpgradeQuoteOption> {
  const title = coerceString(obj.title ?? obj.name ?? obj.planTitle);
  const description = coerceString(
    obj.description ?? obj.subtitle ?? obj.summary ?? obj.body
  );
  const rows = parseRows(obj.rows ?? obj.lines ?? obj.details ?? obj.items);
  const total = parseTotal(obj);
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(rows ? { rows } : {}),
    ...(total ? { total } : {}),
  };
}

function toNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim()) {
    const n = Number.parseFloat(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function amountWithCurrency(raw: unknown, currency: string): string | undefined {
  const n = toNumber(raw);
  if (n === null) return undefined;
  return `${n.toFixed(2)} ${currency}`.replace(".00 ", " ");
}

function mapUpgradeQuoteFromTermShape(
  inner: Record<string, unknown>
): ParsedUpgradeQuote {
  const currency = coerceString(inner.currency)?.trim() || "SAR";
  const monthsRemaining =
    toNumber(inner.monthsRemaining) ??
    toNumber(
      inner.remainingPeriod &&
        typeof inner.remainingPeriod === "object" &&
        !Array.isArray(inner.remainingPeriod)
        ? (inner.remainingPeriod as Record<string, unknown>).monthsRemaining
        : undefined
    );

  const newTermRaw =
    inner.newTerm && typeof inner.newTerm === "object" && !Array.isArray(inner.newTerm)
      ? (inner.newTerm as Record<string, unknown>)
      : null;
  const remRaw =
    inner.remainingPeriod &&
    typeof inner.remainingPeriod === "object" &&
    !Array.isArray(inner.remainingPeriod)
      ? (inner.remainingPeriod as Record<string, unknown>)
      : null;

  const out: ParsedUpgradeQuote = {};

  if (newTermRaw) {
    const termMonths = toNumber(newTermRaw.termMonths);
    const annualPrice = amountWithCurrency(newTermRaw.annualPrice, currency);
    const remainingValueAmount = toNumber(newTermRaw.remainingValue);
    const price = amountWithCurrency(newTermRaw.price, currency);
    const rows: UpgradeQuoteLine[] = [];
    if (termMonths !== null) {
      rows.push({
        label: "New Term",
        value: `${termMonths} Month`,
      });
    }
    if (annualPrice) {
      rows.push({
        label: "Annual price",
        value: annualPrice,
      });
    }
    if (remainingValueAmount !== null) {
      rows.push({
        label: "Remaining value",
        value: `-${Math.abs(remainingValueAmount).toFixed(2)} ${currency}`.replace(
          ".00 ",
          " "
        ),
        highlight: "credit",
      });
    }
    out.newPlan = {
      title: "Upgrade + Start a new plan",
      description:
        "Start a new 12-month subscription with all the benefits of the upgraded plan.",
      ...(rows.length ? { rows } : {}),
      ...(price ? { total: { label: "Total", value: price } } : {}),
    };
  }

  if (remRaw) {
    const remMonths = toNumber(remRaw.monthsRemaining) ?? monthsRemaining;
    const remPrice = amountWithCurrency(remRaw.price, currency);
    const rows: UpgradeQuoteLine[] = [];
    if (remMonths !== null) {
      rows.push({
        label: "Time remaining",
        value: `${remMonths} Month`,
      });
    }
    if (remPrice) {
      rows.push({
        label: "Upgrade cost",
        value: remPrice,
        highlight: "gold",
      });
    }
    out.remainingPeriod = {
      title: "Upgrade for the remaining period",
      description:
        "Complete your current subscription with enhanced benefits for the remaining period only.",
      ...(rows.length ? { rows } : {}),
    };
  }

  return out;
}

function firstObject(
  inner: Record<string, unknown>,
  keys: string[]
): Record<string, unknown> | undefined {
  for (const k of keys) {
    const v = inner[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      return v as Record<string, unknown>;
    }
  }
  return undefined;
}

export type ParsedUpgradeQuote = {
  newPlan?: Partial<NormalizedUpgradeQuoteOption>;
  remainingPeriod?: Partial<NormalizedUpgradeQuoteOption>;
};

/** Extract quote options from various possible API shapes. */
export function parseUpgradeQuotePayload(payload: unknown): ParsedUpgradeQuote {
  const inner = unwrapPayload(payload);
  if (!inner) return {};

  // New backend shape:
  // { monthsConsumed, monthsRemaining, currency, newTerm: {...}, remainingPeriod: {...} }
  if ("newTerm" in inner || "remainingPeriod" in inner) {
    const mapped = mapUpgradeQuoteFromTermShape(inner);
    if (mapped.newPlan || mapped.remainingPeriod) return mapped;
  }

  const out: ParsedUpgradeQuote = {};

  const newObj = firstObject(inner, [
    "newPlan",
    "new_plan",
    "fullTermQuote",
    "fullTerm",
    "startNewPlan",
    "optionNewPlan",
  ]);
  if (newObj) {
    out.newPlan = parseQuoteOption(newObj);
  }

  const remObj = firstObject(inner, [
    "remainingPeriod",
    "remaining_period",
    "proRataQuote",
    "prorated",
    "remainingTerm",
    "optionRemainingPeriod",
  ]);
  if (remObj) {
    out.remainingPeriod = parseQuoteOption(remObj);
  }

  if (!out.newPlan && !out.remainingPeriod && Array.isArray(inner.options)) {
    const [a, b] = inner.options;
    if (a && typeof a === "object" && !Array.isArray(a)) {
      out.newPlan = parseQuoteOption(a as Record<string, unknown>);
    }
    if (b && typeof b === "object" && !Array.isArray(b)) {
      out.remainingPeriod = parseQuoteOption(b as Record<string, unknown>);
    }
  }

  return out;
}

function mergeOption(
  base: NormalizedUpgradeQuoteOption,
  partial?: Partial<NormalizedUpgradeQuoteOption>
): NormalizedUpgradeQuoteOption {
  if (!partial) return base;
  return {
    title: partial.title ?? base.title,
    description: partial.description ?? base.description,
    rows: partial.rows?.length ? partial.rows : base.rows,
    total: partial.total ?? base.total,
  };
}

export function mergeUpgradeQuoteWithDefaults(parsed: ParsedUpgradeQuote): MembershipUpgradeQuoteData {
  return {
    newPlan: mergeOption(MEMBERSHIP_UPGRADE_QUOTE_DEFAULTS.newPlan, parsed.newPlan),
    remainingPeriod: mergeOption(
      MEMBERSHIP_UPGRADE_QUOTE_DEFAULTS.remainingPeriod,
      parsed.remainingPeriod
    ),
  };
}

type UseMembershipUpgradeQuoteOptions = {
  enabled?: boolean;
};

/**
 * GET /privileges/membership/upgrade-quote?targetTier={targetTierId}
 * targetTier should be the selected membership tier id.
 */
export function useMembershipUpgradeQuote(
  targetTierId: string | undefined,
  options?: UseMembershipUpgradeQuoteOptions
) {
  const enabled = Boolean(targetTierId) && options?.enabled !== false;

  return useQuery({
    queryKey: ["privileges", "membership", "upgrade-quote", targetTierId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<unknown>(UPGRADE_QUOTE_PATH, {
        params: { targetTier: targetTierId },
      });
      const parsed = parseUpgradeQuotePayload(data);
      return mergeUpgradeQuoteWithDefaults(parsed);
    },
    enabled,
  });
}
