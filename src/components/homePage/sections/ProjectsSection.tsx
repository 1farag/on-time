"use client";

import Image from "next/image";
import { FadeIn } from "../motion";
import { motion } from "framer-motion";
import { easeOutExpo } from "../motion";

const projects = [
  { src: "/images/projects/project-1.svg", url: " https://richstyle.net" },
  { src: "/images/projects/project-2.svg", url: "https://goup.live" },
  { src: "/images/projects/project-3.svg", url: "https://on-clean.club" },
  { src: "/images/projects/project-4.svg", url: "https://1sr.app" },
  { src: "/images/projects/project-5.svg", url: "https://Herostory.net" },
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

        <div className="grid grid-cols-2 lg:grid-cols-5 items-center gap-x-8 gap-y-12 md:gap-x-12 xl:gap-x-20">
          {projects.map((project, index) => (
            <motion.div
              key={`${project.src}-${index}`}
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 28, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: easeOutExpo,
              }}
              whileHover={{ scale: 1.06 }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
              >
                <Image
                  src={project.src}
                  alt={`project ${index + 1}`}
                  width={360}
                  height={220}
                  unoptimized
                  className="h-auto w-full max-h-[120px] object-contain sm:max-h-[150px] md:max-h-[180px] lg:max-h-[200px]"
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
