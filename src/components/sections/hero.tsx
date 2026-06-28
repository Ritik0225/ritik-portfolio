"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/magnetic";
import { TextReveal } from "@/components/animations/text-reveal";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { personal } from "@/data";

export function Hero() {
  return (
    <section
      id="hero"
      data-cursor-zone
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 sm:pt-28"
    >
      {/* 3D particle field — spans the full hero as an ambient background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 92% 88% at 52% 38%, black 48%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 92% 88% at 52% 38%, black 48%, transparent 100%)",
          }}
        >
          <HeroCanvas />
        </div>
        {/* Readability scrims — keep the headline crisp, blend into the page */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/0 lg:via-background/55" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left — copy */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="eyebrow"
            >
              <span className="eyebrow-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                {personal.available ? "Available for new work" : "Currently engaged"}
              </span>
            </motion.span>

            <div className="mt-6">
              <TextReveal
                lines={[
                  "Building scalable,",
                  "high-performance",
                  "web applications.",
                ]}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg text-pretty"
            >
              Full-stack engineer. I design APIs, model data, ship workflows,
              and integrate AI — across{" "}
              <span className="font-mono text-foreground/90">MERN</span>,{" "}
              <span className="font-mono text-foreground/90">Next.js</span>,
              and the{" "}
              <span className="font-mono text-foreground/90">Shopify</span>{" "}
              ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button asChild size="lg" className="group">
                  <Link href="#work">
                    View Projects
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="secondary" size="lg">
                  <Link href="#contact">
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="ghost" size="lg">
                  <a href={personal.resumeUrl} download>
                    <Download className="h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </Magnetic>
            </motion.div>

            {/* Metrics strip */}
            <motion.dl
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-4 border-t border-border/60 pt-6 sm:grid-cols-4"
            >
              {personal.metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse gap-1">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="text-xl font-semibold tracking-tight">
                    {m.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right — photo */}
          <div className="lg:col-span-5">
            <HeroPhoto />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
          Scroll
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  );
}

/**
 * Hero portrait. Renders `personal.avatarUrl` (currently /avatar.svg — a
 * placeholder); swap that file in /public to use a real photo.
 */
function HeroPhoto() {
  const [errored, setErrored] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md lg:ml-auto"
    >
      {/* Warm glow halo — anchors the figure in the scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 55%, rgba(217,184,122,0.6), rgba(217,184,122,0.2) 45%, transparent 78%)",
        }}
      />

      {/* The photo has its own transparent backdrop + neon UI — no card chrome */}
      <div className="relative aspect-[3/4]">
        {!errored && personal.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={personal.avatarUrl}
            alt={personal.name}
            onError={() => setErrored(true)}
            className="h-full w-full object-contain transition duration-500 hover:grayscale"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-border bg-background/60">
              <User className="h-7 w-7 text-foreground/60" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
              Add your photo
            </span>
          </div>
        )}
      </div>

      {/* Availability chip */}
      <div className="absolute -bottom-3 left-4 flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs backdrop-blur-md">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {personal.available ? "available" : "engaged"}
        </span>
      </div>
    </motion.div>
  );
}
