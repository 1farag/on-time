"use client";

import { GradientText } from "@/components/tools/GradientText";
import { SectionHeader } from "@/components/tools/SectionHeader";
import { useState } from "react";
import { LuPlus, LuMinus } from "react-icons/lu";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "What is On Time?",
    answer:
      "On Time is a premium luxury concierge and lifestyle management platform that provides access to carefully arranged luxury experiences through trusted third-party providers.\n\nServices may include:\n• Private Aviation\n• Luxury Chauffeur Services\n• Luxury Hotel Reservations\n• Private Yacht Experiences\n• Fine Dining Experiences\n• VIP Concierge Services\n• Lifestyle Management Solutions",
  },
  {
    question:
      "Does On Time own the aircraft, vehicles, hotels, yachts, or restaurants?",
    answer:
      "No. On Time acts as a luxury booking, concierge, and lifestyle management platform. Services are fulfilled through independent licensed and qualified third-party providers.",
  },
  {
    question: "Where does On Time operate?",
    answer:
      "On Time primarily serves clients throughout:\n• Kingdom of Saudi Arabia\n• Gulf Cooperation Council (GCC) Countries\n• Middle East\n• Europe\n• North America\n• Asia\n• Other international destinations subject to availability",
  },
  {
    question: "Who can use On Time?",
    answer:
      "On Time is available to:\n• Individuals\n• Families\n• Business Executives\n• Corporate Clients\n• Family Offices\n• VIP Travelers\n• High-Net-Worth Individuals\n\nClients must be at least 18 years old.",
  },
  {
    question: "How do I contact On Time?",
    answer:
      "Clients may contact On Time through:\n• Website\n• Mobile Application\n• Customer Support\n• Dedicated Concierge Team\n• Membership Services Team",
  },
  {
    question: "What are Credits?",
    answer:
      "Credits are the currency of your Style Wallet. Each credit can be redeemed for a service on any qualifying service route across our luxury network.",
  },
  {
    question: "How does Seat Sharing work?",
    answer:
      "Seat Sharing allows you to book individual seats on private jets, giving you the luxury experience at a fraction of the full charter cost.",
  },
  {
    question: "How do I use my style Wallet?",
    answer:
      "Your Style Wallet stores your credits and can be used to book any available service across our platform instantly.",
  },
  {
    question: "Can I purchase additional credits?",
    answer:
      "Yes, you can top up your Style Wallet with additional credits at any time through your account dashboard.",
  },
  {
    question: "What Services are available?",
    answer:
      "We offer a wide range of luxury services including private jet seats, luxury car transfers, hotel stays, yacht experiences, and fine dining reservations.",
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#050505]">
      <div className="container">
        <SectionHeader
          badge="FAQ"
          titleStart="Frequently "
          titleGradient="Asked"
        />

        {/* FAQ List */}
        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-[#222] rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-white text-base font-medium">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <LuMinus size={18} className="text-primary shrink-0" />
                  ) : (
                    <LuPlus size={18} className="text-primary shrink-0" />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-third text-sm leading-relaxed px-6 pb-5 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
