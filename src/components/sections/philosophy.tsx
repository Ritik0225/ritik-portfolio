"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { philosophyPrinciples } from "@/constants/philosophy";

export function Philosophy() {
  return (
    <section id="philosophy" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Engineering Mindset"
          title="How I think about building software."
          description="Five principles that quietly shape every decision I make — from architecture down to the pixel."
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-2 xl:grid-cols-5">
          {philosophyPrinciples.map((p, i) => (
            <li
              key={p.number}
              className="bg-background/80 backdrop-blur-sm transition-colors hover:bg-card/60"
            >
              <Reveal delay={i * 0.04} className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    {p.number}
                  </span>
                  <span className="h-px w-3 bg-foreground/30" />
                </div>
                <h3 className="mt-6 text-base font-semibold tracking-tight text-balance">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground text-pretty">
                  {p.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
