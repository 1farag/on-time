"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

export const FadeIn = ({
  children,
  className,
  delay = 0,
  y = 36,
  x = 0,
  duration = 0.7,
  once = true,
  amount = 0.25,
  ...props
}: FadeInProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: easeOutExpo }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
