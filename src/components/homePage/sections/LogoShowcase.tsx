"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { easeOutExpo } from "../motion";

type LogoShowcaseProps = {
  logos: string[];
  altPrefix: string;
};

export const LogoShowcase = ({ logos, altPrefix }: LogoShowcaseProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-x-8 gap-y-12 md:gap-x-12 xl:gap-x-20">
      {logos.map((logo, index) => (
        <motion.div
          key={`${logo}-${index}`}
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
          <Image
            src={logo}
            alt={`${altPrefix} ${index + 1}`}
            width={360}
            height={220}
            unoptimized
            className="h-auto w-full max-h-[120px] object-contain sm:max-h-[150px] md:max-h-[180px] lg:max-h-[200px]"
          />
        </motion.div>
      ))}
    </div>
  );
};
