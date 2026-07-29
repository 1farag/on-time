import React from "react";
import { MainBanner } from "../tools/sections/MainBanner";
import { RegisterAgentForm } from "./forms/RegisterAgentForm";
import { GradientText } from "../tools/GradientText";

export const RegisterAsAgentComponent = () => {
  return (
    <main>
      <MainBanner backgroundImage="/images/bannerbg.png">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
          Register Now As a <GradientText>Agent</GradientText>
        </h1>
        <p className="text-base  text-[#F5F3F0]">
          Grow your travel business by offering private aviation, shared jet
          seats, and exclusive premium routes to your clients.
        </p>
      </MainBanner>
      <div className="container my-24">
        <RegisterAgentForm />
      </div>
    </main>
  );
};
