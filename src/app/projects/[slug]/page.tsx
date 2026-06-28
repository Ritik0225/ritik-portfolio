import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CircleCheck,
  CircleDot,
  ExternalLink,
  Github,
  Layers,
  Lock,
  Mail,
  Target,
  Wrench,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { getAllProjectSlugs, getProjectBySlug, personal, projects } from "@/data";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return buildMetadata({ title: "Project not found" });
  return buildMetadata({
    title: project.title,
    description: project.tagline,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

  return (
    <article className="relative pt-28 sm:pt-32">
      {/* Back */}
      <div className="container">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link href="/#work">
            <ArrowLeft className="h-3.5 w-3.5" />
            All projects
          </Link>
        </Button>
      </div>

      {/* Hero banner */}
      <header className="container mt-8">
        <Reveal as="span" className="eyebrow">
          <span className="eyebrow-dot" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
            {project.category} · {project.year}
          </span>
        </Reveal>
        <Reveal as="h1" className="mt-5 text-display-md font-semibold tracking-tight gradient-text text-balance">
          {project.title}
        </Reveal>
        <Reveal as="p" delay={0.05} className="mt-4 max-w-3xl text-lg text-muted-foreground text-pretty">
          {project.tagline}
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
          {project.confidential ? (
            <Button asChild>
              <a
                href={`mailto:${personal.email}?subject=${encodeURIComponent(
                  `Walkthrough request: ${project.title}`,
                )}`}
              >
                <Mail className="h-4 w-4" />
                Request walkthrough
              </a>
            </Button>
          ) : (
            <>
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Live demo
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button asChild variant="secondary">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Source
                  </a>
                </Button>
              )}
            </>
          )}
        </Reveal>

        {project.confidential && (
          <Reveal
            delay={0.12}
            className="mt-6 flex max-w-3xl items-start gap-3 rounded-lg border border-border/70 bg-card/40 p-4"
          >
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              <span className="font-medium text-foreground">
                Multi-tenant SaaS product built at Woco.
              </span>{" "}
              Architecture, design decisions, and outcomes shared with
              permission. Source code, tenant data, and internal screenshots
              omitted. Happy to walk through the system on request.
            </p>
          </Reveal>
        )}

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <Reveal delay={0.15} className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-background/80 p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">
                  {m.value}
                </p>
              </div>
            ))}
          </Reveal>
        )}
      </header>

      {/* Banner art */}
      <div className="container mt-14">
        <Reveal className="relative aspect-[16/8] w-full overflow-hidden rounded-xl border border-border bg-muted/30">
          <div className="absolute inset-0 grid place-items-center p-8">
            <div className="w-[78%] rounded-lg border border-border bg-background/80 p-6">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-foreground/20" />
                <span className="h-2 w-2 rounded-full bg-foreground/20" />
                <span className="h-2 w-2 rounded-full bg-foreground/20" />
                <span className="ml-3 font-mono text-[11px] text-muted-foreground">
                  ~ / {project.slug}
                </span>
              </div>
              <div className="mt-6 grid gap-2">
                {[0.95, 0.7, 0.85, 0.5, 0.92, 0.6, 0.75].map((w, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full bg-foreground/15"
                    style={{ width: `${w * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Content grid */}
      <div className="container mt-20 grid gap-12 lg:grid-cols-12">
        <aside className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <Reveal className="rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm">
            <dl className="space-y-5 text-sm">
              <MetaRow icon={<Calendar className="h-3.5 w-3.5" />} label="Year" value={project.year} />
              {project.client && <MetaRow icon={<CircleDot className="h-3.5 w-3.5" />} label="Client" value={project.client} />}
              {project.role && <MetaRow icon={<CircleDot className="h-3.5 w-3.5" />} label="Role" value={project.role} />}
              <MetaRow icon={<Layers className="h-3.5 w-3.5" />} label="Category" value={project.category} />
            </dl>
            <div className="mt-6 border-t border-border/60 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Stack
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Badge key={s} variant="muted" className="font-mono text-[10px]">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        </aside>

        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
              {project.description}
            </p>
          </Reveal>

          <ContentBlock icon={<Target className="h-4 w-4" />} title="Problem">
            <p className="text-pretty">{project.problem}</p>
          </ContentBlock>

          <ContentBlock icon={<Layers className="h-4 w-4" />} title="Architecture">
            <p className="text-pretty">{project.architecture}</p>
          </ContentBlock>

          {project.features.length > 0 && (
            <ContentBlock icon={<CircleCheck className="h-4 w-4" />} title="Features">
              <ul className="space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/60" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </ContentBlock>
          )}

          {project.challenges.length > 0 && (
            <ContentBlock icon={<Wrench className="h-4 w-4" />} title="Challenges & solutions">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Challenges
                  </p>
                  <ul className="mt-3 space-y-2">
                    {project.challenges.map((c) => (
                      <li key={c} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 h-px w-2 shrink-0 bg-foreground/40" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Solutions
                  </p>
                  <ul className="mt-3 space-y-2">
                    {project.solutions.map((s) => (
                      <li key={s} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 h-px w-2 shrink-0 bg-foreground" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ContentBlock>
          )}

          {project.optimizations.length > 0 && (
            <ContentBlock icon={<Zap className="h-4 w-4" />} title="Performance optimizations">
              <ul className="space-y-2">
                {project.optimizations.map((o) => (
                  <li key={o} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/60" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </ContentBlock>
          )}

          {project.screenshots.length > 0 && (
            <ContentBlock title="Screenshots">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((s, i) => (
                  <figure key={i} className="overflow-hidden rounded-xl border border-border/70 bg-card/40">
                    <div className="aspect-video bg-gradient-to-br from-brand-700/20 to-transparent" aria-label={s.caption} />
                    {s.caption && (
                      <figcaption className="border-t border-border/60 px-4 py-2 text-xs text-muted-foreground">
                        {s.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </ContentBlock>
          )}
        </div>
      </div>

      {/* Next project */}
      {next && next.slug !== project.slug && (
        <section className="container mt-24 mb-24">
          <Reveal className="group flex items-center justify-between rounded-xl border border-border bg-card/40 p-6 transition-colors hover:border-foreground/40">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Next project
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">{next.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{next.tagline}</p>
            </div>
            <Button asChild>
              <Link href={`/projects/${next.slug}`}>
                Open
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </Reveal>
        </section>
      )}
    </article>
  );
}

function MetaRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="text-right text-sm font-medium">{value}</dd>
    </div>
  );
}

function ContentBlock({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="mt-12">
      <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
        {icon && (
          <span className="grid h-7 w-7 place-items-center rounded-md border border-border bg-background/50 text-foreground">
            {icon}
          </span>
        )}
        {title}
      </h3>
      <div className="mt-4 text-base leading-relaxed text-foreground/85">
        {children}
      </div>
    </Reveal>
  );
}
