"use client";

import { FadeIn } from "../motion";
import { LogoShowcase } from "./LogoShowcase";

const projects = [
  "/images/projects/project-1.svg",
  "/images/projects/project-2.svg",
  "/images/projects/project-3.svg",
  "/images/projects/project-4.svg",
];

export const ProjectsSection = () => {
  return (
    <section
      className="relative flex md:min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/clients-bg.png')",
      }}
      id="projects"
    >
      <div className="container relative z-10 w-full  py-16 md:py-28">
        <FadeIn className="mb-16 md:mb-24">
          <h2 className="mb-5 text-5xl font-bold text-primary">Our Projects</h2>

          <p className="text-2xl leading-relaxed text-white">
            Where ideas become digital experiences.
          </p>
        </FadeIn>

        <LogoShowcase logos={projects} altPrefix="Project" />
      </div>
    </section>
  );
};
