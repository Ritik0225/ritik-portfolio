"use client";

import { cloneElement, type ReactElement } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticProps {
  children: ReactElement<{ ref?: React.Ref<HTMLElement>; className?: string }>;
  strength?: number;
}

export function Magnetic({ children, strength = 0.22 }: MagneticProps) {
  const ref = useMagnetic<HTMLElement>(strength);
  return cloneElement(children, {
    ref,
    className: [children.props.className, "will-change-transform"]
      .filter(Boolean)
      .join(" "),
  });
}
