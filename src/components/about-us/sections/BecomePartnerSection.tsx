"use client";
import PartnerWithUsModal from "@/components/tools/modal/partner-with-us-modal/PartnerWithUsModal";
import { PartnerWithUsSection } from "@/components/tools/sections/PartnerWithUsSection";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { Button } from "antd";
import Link from "next/link";

interface BecomePartnerSectionProps {
  data: {
    about_partner_title_desc_en: string;
    about_partner_title_desc_ar?: string;
    about_partner_description_desc_en: string;
    about_partner_description_desc_ar?: string;
  };
}

export const BecomePartnerSection = ({ data }: BecomePartnerSectionProps) => {
  const getLink = useLocalizedLink();

  return (
    <PartnerWithUsSection
      title={data?.about_partner_title_desc_en}
      desc={data?.about_partner_description_desc_en}
    >
      <div className="mt-[56px] flex items-center justify-center gap-4 md:flex-col">
        <Link
          href={getLink("/what-we-offer")}
          className="flex !border-secondary !text-secondary sm:w-full"
        >
          <Button
            type="default"
            className="!border-secondary !bg-transparent !text-secondary sm:w-full"
          >
            Learn more about our process
          </Button>
        </Link>
        <PartnerWithUsModal />
      </div>
    </PartnerWithUsSection>
  );
};
