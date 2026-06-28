"use client";

import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { testimonials } from "@/data";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Kind Words"
          title="What collaborators say about working together."
          align="center"
        />
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <figure className="relative h-full rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm">
                <Quote
                  aria-hidden
                  className="absolute right-5 top-5 h-5 w-5 text-foreground/20"
                />
                <blockquote className="text-sm leading-relaxed text-foreground/90 text-pretty">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 border-t border-border/60 pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
