"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { projects } from "@/data";
import type { Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "MERN",
  "Shopify",
  "Full Stack",
  "Frontend",
  "Backend",
];

export function Projects() {
  const [filter, setFilter] = React.useState<(typeof CATEGORIES)[number]>("All");

  const filtered = React.useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="work" className="section" data-cursor-zone>
      <div className="container">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected Work"
            title="Production projects, built for scale."
            description="A curated selection of recent work — focused on architecture, performance, and craft."
          />

          <Reveal as="div" className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={active}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-border/70 bg-card/60 backdrop-blur"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {c}
                </button>
              );
            })}
          </Reveal>
        </div>

        <LayoutGroup>
          <motion.div
            layout
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Nothing here yet for that filter.
          </p>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      data-cursor-label="View"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.2), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Open ${project.title} case study`}
        className="absolute inset-0 z-10"
      />

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted/40">
        <div className="absolute inset-0 grid place-items-center p-6">
          {/* Decorative code window — flat monochrome */}
          <div className="relative w-full max-w-[80%] rounded-lg border border-border bg-background/80 p-3 transition-transform duration-700 group-hover:scale-[1.02]">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
              <span className="ml-2 font-mono text-[10px] text-muted-foreground">
                {project.slug}
              </span>
            </div>
            <div className="mt-3 space-y-1.5">
              {[0.9, 0.7, 0.85, 0.5, 0.95].map((w, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full bg-foreground/15"
                  style={{ width: `${w * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute right-3 top-3 z-20">
          <Badge variant="outline">{project.category}</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">
            {project.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {project.tagline}
        </p>

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border/60 pt-4">
            {project.metrics.slice(0, 4).map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-0.5 text-sm font-semibold">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Stack */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((t) => (
            <Badge key={t} variant="muted" className="font-mono text-[10px]">
              {t}
            </Badge>
          ))}
          {project.stack.length > 4 && (
            <Badge variant="outline" className="font-mono text-[10px]">
              +{project.stack.length - 4}
            </Badge>
          )}
        </div>

        {/* CTAs */}
        <div className="relative z-20 mt-6 flex items-center gap-2">
          <Button asChild variant="secondary" size="sm">
            <Link href={`/projects/${project.slug}`}>
              Case study
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          {project.confidential ? (
            <Badge
              variant="outline"
              className="ml-1 gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              <Lock className="h-3 w-3" />
              Proprietary · Woco
            </Badge>
          ) : (
            <>
              {project.liveUrl && (
                <Button asChild variant="ghost" size="sm">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} live site`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button asChild variant="ghost" size="sm">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} repository`}
                  >
                    <Github className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}
