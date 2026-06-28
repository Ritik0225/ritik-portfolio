"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => (
    <div aria-hidden className="absolute inset-0 grid place-items-center">
      <div className="h-2 w-2 animate-pulse rounded-full bg-primary/60" />
    </div>
  ),
});

export function HeroCanvas() {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  // Theme-aware star colors.
  // Dark: pale cool-blue ambient stars + bright cyan glow stars on near-black slate bg.
  // Light: deep blue ambient stars + cyan glow stars on near-white slate bg.
  const baseColor = isLight ? "#1D4ED8" : "#DBEAFE";
  const accentColor = isLight ? "#0891B2" : "#22D3EE";

  return (
    <HeroScene
      isMobile={isMobile}
      prefersReducedMotion={reduced}
      baseColor={baseColor}
      accentColor={accentColor}
    />
  );
}
