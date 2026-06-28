"use client";

import * as React from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenisRef } from "@/components/shared/smooth-scroll-provider";

/**
 * Floating back-to-top button. Fades in after the page is scrolled past
 * ~600px and traces overall scroll progress as a ring around itself.
 * Scrolls via Lenis when available so it matches the site's smooth scroll.
 */
export function BackToTop() {
  const lenisRef = useLenisRef();
  const [visible, setVisible] = React.useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.5,
  });

  React.useEffect(() => {
    const check = () => setVisible(scrollY.get() > 600);
    check();
    return scrollY.on("change", check);
  }, [scrollY]);

  const handleClick = () => {
    const lenis = lenisRef?.current;
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          className="group fixed bottom-6 right-6 z-[70] grid h-12 w-12 place-items-center rounded-full bg-card/70 text-muted-foreground shadow-lg backdrop-blur-md transition-colors hover:text-foreground sm:bottom-8 sm:right-8"
        >
          {/* Scroll-progress ring */}
          <svg
            aria-hidden
            viewBox="0 0 48 48"
            className="absolute inset-0 h-full w-full -rotate-90"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="2"
              className="stroke-border/70"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-foreground"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
