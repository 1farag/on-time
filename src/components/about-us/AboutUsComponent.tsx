"use client";

import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { useAboutUsContent } from "@/hooks/useAboutUsContent";
import { Col, Row } from "antd";
import { GradientText } from "../tools/GradientText";

const staticStats = [
  { value: "98%", label: "Customer satisfaction" },
  { value: "24 / 7", label: "support" },
];

export const AboutUsComponent = () => {
  const { data: aboutUs, isLoading } = useAboutUsContent();

  if (isLoading) {
    return <LoaderS1 />;
  }

  if (!aboutUs?.published) {
    return (
      <main>
        <section className="bg-[#0B0E14] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-third text-base">
              About us content is currently unavailable.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const stats = [
    { value: `+${aboutUs.statistics.monthlyTrips}`, label: "Monthly trip" },
    { value: `+${aboutUs.statistics.airplaneNumber}`, label: "Airplane" },
    ...staticStats,
  ];

  return (
    <main>
      <section className="py-20 mt-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              <GradientText>{aboutUs.title}</GradientText>
            </h1>

            <p className="text-third text-lg">
              On Time Part Of{" "}
              <a
                href="https://www.on-time.group/"
                target="_blank"
                className="text-primary underline"
              >
                OnTime Group
              </a>{" "}
              Services.
            </p>

            <p className="text-third text-lg">
              At On Time, we believe luxury travel is more than
              transportation—it is a carefully curated experience. Our mission
              is to provide exceptional private aviation and lifestyle solutions
              with unmatched attention to detail, discretion, and personalized
              service.
            </p>
          </div>

          <div className="bg-[#121720] rounded-2xl p-8 mb-10">
            <h3 className="text-white text-xl font-bold mb-4">
              {aboutUs.vision.titleEn}
            </h3>
            <p className="text-third text-lg leading-relaxed">
              {aboutUs.vision.subtitleEn}
            </p>
          </div>

          <div className="bg-[#121720] rounded-2xl p-8 mb-10">
            <h3 className="text-white text-xl font-bold mb-4">
              {aboutUs.mission.titleEn}
            </h3>
            <p className="text-third text-lg leading-relaxed">
              {aboutUs.mission.subtitleEn}
            </p>
          </div>
          <div className="bg-[#121720] rounded-2xl p-8 mb-10">
            <h3 className="text-white text-xl font-bold mb-4">OUR VALUES</h3>
            <ul className="text-third text-lg leading-relaxed flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="flex w-[5px] h-[5px] rounded-full bg-white" />
                Excellence
              </li>
              <li className="flex items-center gap-4">
                <span className="flex w-[5px] h-[5px] rounded-full bg-white" />
                Privacy
              </li>
              <li className="flex items-center gap-4">
                <span className="flex w-[5px] h-[5px] rounded-full bg-white" />
                Reliability
              </li>
              <li className="flex items-center gap-4">
                <span className="flex w-[5px] h-[5px] rounded-full bg-white" />
                Personalization
              </li>
            </ul>
          </div>

          <Row gutter={[16, 16]}>
            {stats.map((stat) => (
              <Col key={stat.label} xs={12} md={6}>
                <div className="bg-[#121720] rounded-2xl p-6 text-center h-full">
                  <p className="text-primary text-3xl font-bold mb-2">
                    {stat.value}
                  </p>
                  <p className="text-third text-lg">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </main>
  );
};
