import { SinglePricePlanComponent } from "@/components/membership/single-price-plan/SinglePricePlanComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خطط العضوية",
};

type PageProps = {
  params: Promise<{ pricePlanId: string }>;
  searchParams?: Promise<Record<string, string>>;
};

const PricePlansPage = async ({ params }: PageProps) => {
  const { pricePlanId } = await params;

  return (
    <SinglePricePlanComponent id={pricePlanId} />
  );
};

export default PricePlansPage;
