import { Button } from "antd";
import { LuCheck } from "react-icons/lu";

export type MembershipCardPlan = {
  icon: React.ReactNode;
  title: string;
  price: number;
  currency?: string;
  features: string[];
  featured?: boolean;
  badgeText?: string | null;
  joinHref?: string;
  onJoin?: () => void | Promise<void>;
  joinLoading?: boolean;
  joinLabel?: string;
  buttonType?: "default" | "primary";
};

function cleanMembershipText(text: string): string {
  const cleaned = text
    .replace(/pinnacle/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return cleaned || "Membership";
}

export const MembershipCard = ({ plan }: { plan: MembershipCardPlan }) => {
  const safeTitle = cleanMembershipText(plan.title);
  const safeFeatures = plan.features.map((f) => cleanMembershipText(String(f)));

  return (
    <div
      className={`relative rounded-2xl p-6 h-full flex flex-col gap-5 border transition-all duration-300 bg-[#121212] border-[#2A2A2A]`}
    >
      {/* Title */}
      <h3 className="text-white font-semibold text-2xl">{safeTitle}</h3>

      {/* Price */}
      <div className="flex items-baseline gap-1.5">
        {plan.price === 0 ? (
          <span className="text-white text-5xl">Free</span>
        ) : (
          <>
            <span className="text-white text-5xl">
              {plan.price.toLocaleString()}
            </span>
            <span className="text-[#666] text-sm font-medium">
              {plan.currency ?? "SAR"}
            </span>
          </>
        )}
      </div>

      {/* Divider */}

      {/* Features */}
      <ul className=" relative flex flex-col gap-3 flex-1 ">
        <div className="w-full mx-auto my-8 h-px bg-gradient-to-r from-transparent via-[#8C6A2D] to-transparent" />

        {safeFeatures.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-[#999] text-sm">
            <LuCheck size={15} className="text-[#E2B45F] shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Button */}
      <Button
        type={"default"}
        className="w-full !py-5 !rounded-xl"
        loading={plan.joinLoading}
        {...(plan.joinHref
          ? { href: plan.joinHref }
          : { onClick: () => void plan.onJoin?.() })}
      >
        {plan.joinLabel ?? "Join now"}
      </Button>
    </div>
  );
};
