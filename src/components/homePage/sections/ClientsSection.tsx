"use client";

import { FadeIn } from "../motion";
import { LogoShowcase } from "./LogoShowcase";

const clients = [
  "/images/clients/client-1.svg",
  "/images/clients/client-2.svg",
  "/images/clients/client-3.svg",
  "/images/clients/client-4.svg",
];

export const ClientsSection = () => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/clients-bg.png')",
      }}
      id="clients"
    >
      <div className="container relative z-10 w-full py-28">
        <FadeIn className="mb-16 md:mb-24">
          <h2 className="mb-5 text-5xl font-bold text-primary">Our Clients</h2>

          <p className="text-2xl leading-relaxed text-white">
            Where brands turn vision into reality
          </p>
        </FadeIn>

        <LogoShowcase logos={clients} altPrefix="Client" />
      </div>
    </section>
  );
};
