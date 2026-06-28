"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/animations/reveal";
import { experience } from "@/data";
import { calcDuration, formatDateRange } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Career"
          title="A timeline of building, shipping, and scaling."
          description="Four years of full-stack work across SaaS, fintech, and Shopify Plus brands."
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:left-1/2 sm:-translate-x-1/2"
          />

          <ol className="space-y-12">
            {experience.map((exp, i) => (
              <li key={exp.id} className="relative">
                <Reveal>
                  <article
                    className={`relative flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10 ${
                      i % 2 === 0 ? "" : "sm:[&>*:first-child]:order-2"
                    }`}
                  >
                    {/* Node */}
                    <span
                      aria-hidden
                      className="absolute left-4 top-2 -translate-x-1/2 sm:left-1/2"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative block h-3 w-3 rounded-full border border-foreground bg-background"
                      />
                    </span>

                    {/* Card */}
                    <div className="ml-10 sm:ml-0">
                      <div className="rounded-xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-primary/50">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-base font-semibold">
                              {exp.role}
                            </h3>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                              <span className="text-foreground/90">
                                {exp.company}
                              </span>{" "}
                              · {exp.location}
                            </p>
                          </div>
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border bg-background/50 text-foreground">
                            <Briefcase className="h-4 w-4" />
                          </span>
                        </div>

                        <p className="mt-4 text-sm text-muted-foreground">
                          {exp.description}
                        </p>

                        <ul className="mt-4 space-y-1.5 text-sm">
                          {exp.responsibilities.map((r) => (
                            <li key={r} className="flex gap-2">
                              <span
                                aria-hidden
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/60"
                              />
                              <span className="text-foreground/85">{r}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {exp.technologies.map((t) => (
                            <Badge
                              key={t}
                              variant="muted"
                              className="font-mono text-[10px]"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>

                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            Visit {exp.company}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="ml-10 sm:ml-0 sm:pt-3">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {calcDuration(exp.startDate, exp.endDate)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {exp.type}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
