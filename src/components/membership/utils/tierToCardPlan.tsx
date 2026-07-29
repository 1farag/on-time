import { LuBriefcase, LuCrown, LuStar } from "react-icons/lu";
import type { MembershipTier } from "../hooks/useMembershipTiers";
import type { MembershipCardPlan } from "../sections/MemberShipCard";

function tierIcon(code: string) {
  const c = code.toUpperCase();
  if (c === "EXPLORER") return <LuBriefcase size={26} />;
  if (c === "ELITE") return <LuCrown size={26} />;
  if (c === "SOVEREIGN") return <LuStar size={26} />;
  return <LuStar size={26} />;
}

export function tierToCardPlan(tier: MembershipTier): MembershipCardPlan {
  const raw = tier.annualPrice ?? tier.monthlyPrice ?? "0";
  const price = Number.parseFloat(String(raw));
  const safePrice = Number.isFinite(price) ? price : 0;

  return {
    icon: tierIcon(tier.code),
    title: tier.name,
    price: safePrice,
    currency: tier.currency ?? "SAR",
    features: Array.isArray(tier.benefits) ? tier.benefits : [],
    featured: Boolean(tier.isHighlighted),
    badgeText: tier.badge,
  };
}
