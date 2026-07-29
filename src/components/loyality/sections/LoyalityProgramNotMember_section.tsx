import Link from "next/link";
import React from "react";

export const LoyalityProgramNotMember_section = () => {
  return (
    <div className="loyality-program-not-member container">
      <h5 className="font-bold text-3xl">ليس لديك عضوية بعد؟</h5>
      <p>انضم لبرنامج العضوية واحصل على مضاعف نقاط أعلى ومزايا حصرية</p>

      <Link
        href="/membership"
        className="w-fit flex items-center justify-center bg-white  text-primary hover:text-primary px-12 py-2 rounded-lg text-md font-medium"
      >
        اكتشف برنامج العضوية{" "}
      </Link>
    </div>
  );
};
