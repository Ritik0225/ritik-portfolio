"use client";

import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { education } from "@/data";
import { formatDateRange } from "@/lib/utils";

export function Education() {
  if (education.length === 0) return null;
  return (
    <section aria-labelledby="education-heading" className="container mt-4 mb-24 sm:mt-8">
      <Reveal>
        <div className="mx-auto max-w-4xl">
          <h3
            id="education-heading"
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
          >
            <span className="h-px w-8 bg-border" />
            Education
          </h3>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {education.map((e) => (
              <li
                key={e.id}
                className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-primary/30"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border bg-background/50 text-foreground">
                  <GraduationCap className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold tracking-tight">
                    {e.degree} · {e.field}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground truncate">
                    {e.institution}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    <span>{formatDateRange(e.startDate, e.endDate)}</span>
                    {e.score && (
                      <span className="text-foreground/80">{e.score}</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
