import React from "react";
import { MainBanner } from "../tools/sections/MainBanner";
import { RegisterCompanyForm } from "./forms/RegisterCompanyForm";
import { GradientText } from "../tools/GradientText";

export const RegisterAsCompanyComponent = () => {
  return (
    <main>
      <MainBanner backgroundImage="/images/bannerbg.png">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
          Register Now As a <GradientText>Company</GradientText>
        </h1>
        <p className="text-base  text-[#F5F3F0]">
          Register today and enjoy an exclusive 10% discount on your first 5
          private flight bookings, with premium comfort and <br /> seamless
          travel experiences.
        </p>
      </MainBanner>{" "}
      <div className="container my-24">
        <RegisterCompanyForm />
      </div>
    </main>
  );
};
