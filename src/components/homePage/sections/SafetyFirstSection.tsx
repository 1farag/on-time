import { Col, Row } from "antd";
import { GoShieldCheck } from "react-icons/go";
import { LuBadgeCheck } from "react-icons/lu";
import { TbFileCheck } from "react-icons/tb";

type SafetyItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const safetyItems: SafetyItem[] = [
  {
    icon: <GoShieldCheck size={28} className="text-primary" />,
    title: "Authorized Operators",
    description:
      "All operators are licensed by the General Authority of Civil Aviation.",
  },
  {
    icon: <LuBadgeCheck size={28} className="text-primary" />,
    title: "Safety Standards",
    description:
      "Full commitment to the highest international safety standards",
  },
  {
    icon: <TbFileCheck size={28} className="text-primary" />,
    title: "Regulatory Compliance",
    description:
      "Full compliance with aviation regulations in the Kingdom of Saudi Arabia",
  },
];

export const SafetyFirstSection = () => {
  return (
    <section className="bg-[#0B0E14] py-20 px-6">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-bold mb-3">
            <span className="text-primary">Safety </span>
            <span className="text-white">First</span>
          </h2>
          <p className="text-third text-base">Your trust is our top priority</p>
        </div>

        {/* Cards */}
        <Row gutter={[24, 24]}>
          {safetyItems.map((item, i) => (
            <Col key={i} xs={24} md={8}>
              <div className="bg-[#111720] border border-[#1c222e] rounded-2xl p-8 h-full flex flex-col items-center text-center gap-4">
                {/* Icon */}
                <div className="flex items-center justify-center text-2xl">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg">{item.title}</h3>

                {/* Description */}
                <p className="text-third text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};
