import Cookies from "js-cookie";

export const AFFILIATE_REF_COOKIE = "AffiliateRef";

export function sanitizeAffiliateRef(raw: string): string | null {
  const value = raw.trim();

  // Allow common affiliate tracking codes like: AFF-0QSQFDG5
  // Keep it strict to avoid injecting arbitrary cookie values.
  if (!/^[A-Za-z0-9_-]{3,64}$/.test(value)) return null;

  return value;
}

export function setAffiliateRef(ref: string) {
  Cookies.set(AFFILIATE_REF_COOKIE, ref, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: 30, // days
  });
}

export function getAffiliateRef(): string | undefined {
  return Cookies.get(AFFILIATE_REF_COOKIE);
}

/**
 * Capture a `?ref=` param and persist it in cookies.
 * Intended to be called from a client component (e.g. a layout).
 */
export function captureAffiliateRefFromUrlParam(refParam: string | null) {
  if (!refParam) return;

  const sanitized = sanitizeAffiliateRef(refParam);
  if (!sanitized) return;

  const existing = getAffiliateRef();
  if (existing === sanitized) return;

  setAffiliateRef(sanitized);
}

