import React from "react";
import { MainBanner } from "../tools/sections/MainBanner";
import { RegisterOwnershipForm } from "./forms/RegisterOwnershipForm";
import { GradientText } from "../tools/GradientText";

export const RegisterAsOwnershipComponent = () => {
  return (
    <main>
      <MainBanner backgroundImage="/images/bannerbg.png">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
          Register Now As a <GradientText>Ownership</GradientText>
        </h1>
        <p className="text-base text-[#F5F3F0]">
          Grow your access to private aviation through smart ownership
          solutions, shared jet access, and exclusive premium travel
          experiences.
        </p>
      </MainBanner>
      <div className="container my-24">
        <RegisterOwnershipForm />
      </div>
    </main>
  );
};
