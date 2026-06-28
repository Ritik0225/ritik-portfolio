"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Section-scoped custom cursor — a precise dot plus a spring-lagged ring.
 *
 * Renders only on hover-capable, fine-pointer devices with motion enabled.
 * It stays invisible until the pointer enters an element marked with
 * `data-cursor-zone`. Inside a zone it reads the nearest `data-cursor-label`
 * and morphs the ring into a filled, labelled disc (e.g. "View", "Explore").
 */
export function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [label, setLabel] = React.useState<string | null>(null);
  const [pressed, setPressed] = React.useState(false);

  // Raw pointer position — the dot tracks this exactly.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // The ring lags behind with spring physics.
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.45 });

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      const zone = target?.closest("[data-cursor-zone]") ?? null;
      setActive(Boolean(zone));
      const labelEl = zone
        ? (target?.closest("[data-cursor-label]") as HTMLElement | null)
        : null;
      setLabel(labelEl?.dataset.cursorLabel || null);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      setActive(false);
      setLabel(null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const hasLabel = active && Boolean(label);
  const ringSize = hasLabel ? 74 : 36;

  return (
    <>
      {/* Spring-lagged ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200]"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: pressed ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        <motion.div
          className={
            "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-200 " +
            (hasLabel
              ? "border border-transparent bg-foreground"
              : "border border-foreground/40 bg-foreground/[0.03]")
          }
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: active ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          {hasLabel && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="select-none font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-background"
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200]"
        style={{ x, y }}
      >
        <motion.div
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
          animate={{ opacity: active && !hasLabel ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
