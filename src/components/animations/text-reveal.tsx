"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

interface TextRevealProps {
  lines: string[];
  className?: string;
  highlightLast?: boolean;
}

export function TextReveal({ lines, className, highlightLast = true }: TextRevealProps) {
  return (
    <motion.h1
      className={cn(
        "text-display-md font-semibold leading-[1.05] tracking-tight text-balance",
        className,
      )}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {lines.map((text, i) => (
        <span
          key={i}
          className="block overflow-hidden pb-[0.06em] [perspective:1000px]"
        >
          <motion.span
            variants={line}
            className={cn(
              "inline-block",
              highlightLast && i === lines.length - 1
                ? "brand-text"
                : "gradient-text",
            )}
          >
            {text}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
