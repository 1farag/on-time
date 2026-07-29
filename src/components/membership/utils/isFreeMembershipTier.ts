import type { MembershipTier } from "../hooks/useMembershipTiers";

export function isFreeMembershipTier(tier: MembershipTier): boolean {
  const monthly = Number.parseFloat(String(tier.monthlyPrice ?? "0"));
  const annual = Number.parseFloat(String(tier.annualPrice ?? "0"));
  const safeMonthly = Number.isFinite(monthly) ? monthly : 0;
  const safeAnnual = Number.isFinite(annual) ? annual : 0;
  return tier.isDefault === true || (safeMonthly === 0 && safeAnnual === 0);
}
