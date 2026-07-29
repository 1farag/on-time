"use client";

import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { useFaqContent } from "@/hooks/useFaqContent";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { GradientText } from "../tools/GradientText";
import { useAppContent } from "@/hooks/useAppContent";

const SLUG = "faq";

export const FAQComponent = () => {
  const { data: appContent, isLoading } = useAppContent(SLUG);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (isLoading) {
    return <LoaderS1 />;
  }

  if (!appContent?.published) {
    return (
      <main>
        <section className="bg-[#0B0E14] py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-third text-base">
              FAQ content is currently unavailable.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const htmlContent = appContent.contentEn?.trim() ?? "";

  return (
    <main className="page-terms-content">
      <section className="mt-14 py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-3">
              <GradientText>{appContent.title}</GradientText>
            </h1>
            <p className="text-third text-base">
              Find answers to frequently asked questions.
            </p>
          </div>

          {htmlContent ? (
            <div className="bg-[#161b27] rounded-2xl p-8 flex flex-col gap-4 app-content-html [&_h3]:text-white [&_h3]:font-bold [&_h3]:text-2xl [&_h3]:mb-2 [&_h3_strong]:text-white [&_p]:text-third [&_p]:text-sm [&_p]:leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          ) : (
            <div className="bg-[#161b27] rounded-2xl p-8 text-center">
              <p className="text-third text-sm">
                No content is available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
