import { GradientText } from "./GradientText";

type SectionHeaderProps = {
  badge?: string;
  titleStart: string;
  titleGradient: string;
  description?: string;
};

export const SectionHeader = ({
  badge,
  titleStart,
  titleGradient,
  description,
}: SectionHeaderProps) => {
  return (
    <div className="flex flex-col items-center text-center gap-4 mb-20">
      {badge && (
        <p className="text-primary text-xs tracking-[0.3em] uppercase flex items-center gap-2">
          <span>—</span>
          {badge}
          <span>—</span>
        </p>
      )}

      <h2 className="text-3xl md:text-5xl text-white">
        {titleStart} <GradientText italic>{titleGradient}</GradientText>
      </h2>

      {description && (
        <p className="text-third text-base md:text-base max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
