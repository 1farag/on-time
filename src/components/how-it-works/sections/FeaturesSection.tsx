import { Col, Row } from "antd";
import Image from "next/image";
import { GoCheckCircle } from "react-icons/go";

type FeatureItem = {
  number: string;
  title: string;
  description: string;
  // bullets: string[];
  image: string;
  reverse?: boolean;
};

const features: FeatureItem[] = [
  {
    number: "01",
    title: "Why Rich Style  ",
    description:
      "Rich Style  is not just a booking service. It is a private aviation partner for clients who want guidance, clarity, and premium execution. We combine aviation coordination, client advisory, and regional understanding to provide a smarter way to fly private. ",
    // bullets: [
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    // ],
    image: "/images/how-it-works1.jpeg",
    reverse: false,
  },
  {
    number: "02",
    title: "Experience Private Aviation with Rich Style  ",
    description:
      "Whether you are planning a business trip, family journey, VIP movement, or corporate travel program, Rich Style  is ready to support your next flight. ",
    // bullets: [
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    // ],
    image: "/images/how-it-works2.jpeg",
    reverse: true,
  },
];

const FeatureRow = ({ feature }: { feature: FeatureItem }) => {
  const imageCol = (
    <Col xs={24} md={11}>
      <div className="relative w-full h-[506px] rounded-2xl overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover"
        />
      </div>
    </Col>
  );

  const contentCol = (
    <Col xs={24} md={13}>
      <div
        className={`h-full flex flex-col justify-center ${feature.reverse ? "text-left md:text-right" : ""}`}
      >
        <span className="text-6xl font-bold text-[#E8B84B]/25 block mb-4">
          {feature.number}
        </span>

        <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-snug">
          {feature.title}
        </h3>

        <p className="text-third text-sm leading-relaxed mb-6">
          {feature.description}
        </p>

        {/* <ul className="flex flex-col gap-3">
          {feature.bullets.map((bullet, i) => (
            <li
              key={i}
              className={`flex items-start gap-3 text-[#F4F3F1] text-sm ${
                feature.reverse
                  ? "flex-row-reverse justify-end md:flex-row md:justify-end"
                  : ""
              }`}
            >
              {!feature.reverse && (
                <GoCheckCircle
                  size={18}
                  className="text-[#E8B84B] mt-0.5 shrink-0"
                />
              )}
              <span>{bullet}</span>
              {feature.reverse && (
                <GoCheckCircle
                  size={18}
                  className="text-[#E8B84B] mt-0.5 shrink-0"
                />
              )}
            </li>
          ))}
        </ul> */}
      </div>
    </Col>
  );

  return (
    <Row gutter={[48, 40]} align="middle" className="pb-16">
      {feature.reverse ? (
        <>
          {contentCol}
          {imageCol}
        </>
      ) : (
        <>
          {imageCol}
          {contentCol}
        </>
      )}
    </Row>
  );
};

export const FeaturesSection = () => {
  return (
    <section className="bg-[#0B0E14]">
      <div className="container">
        {features.map((feature) => (
          <FeatureRow key={feature.number} feature={feature} />
        ))}
      </div>
    </section>
  );
};
