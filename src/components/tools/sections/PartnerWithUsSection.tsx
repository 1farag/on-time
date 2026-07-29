import type { ReactNode } from "react";

type PartnerWithUsSectionProps = {
  title: string;
  desc: string;
  children?: ReactNode;
};

export const PartnerWithUsSection = ({
  title,
  desc,
  children,
}: PartnerWithUsSectionProps) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        {title ? (
          <h2 className="mb-6 text-3xl font-bold text-secondary md:text-4xl">
            {title}
          </h2>
        ) : null}
        {desc ? (
          <p className="mx-auto mb-2 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
            {desc}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
};
