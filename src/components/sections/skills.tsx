"use client";

import { motion } from "framer-motion";
import { Code2, Server, Database, ShoppingBag, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, staggerContainer, staggerItem } from "@/components/animations/reveal";
import { skills } from "@/data";
import type { SkillCategory } from "@/types";

const ICONS: Record<SkillCategory, React.ReactNode> = {
  Frontend: <Code2 className="h-4 w-4" />,
  Backend: <Server className="h-4 w-4" />,
  Database: <Database className="h-4 w-4" />,
  Shopify: <ShoppingBag className="h-4 w-4" />,
  "Dev Tools": <Wrench className="h-4 w-4" />,
};

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Stack"
          title="Tools I reach for, sharpened over years of building."
          description="A working stack tuned for shipping production systems — chosen for fit, not novelty."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group, idx) => (
            <Reveal key={group.category} delay={idx * 0.04}>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="group relative h-full overflow-hidden rounded-xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-primary/50"
              >
                <div className="relative">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-background/50 text-foreground">
                      {ICONS[group.category]}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{group.title}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {group.category}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground">
                    {group.description}
                  </p>

                  <motion.ul
                    className="mt-5 space-y-2.5"
                    variants={staggerContainer}
                  >
                    {group.skills.map((s) => (
                      <motion.li
                        key={s.name}
                        variants={staggerItem}
                        className="flex items-center gap-3"
                      >
                        <span className="w-28 shrink-0 text-sm font-medium">
                          {s.name}
                        </span>
                        <div className="relative h-px flex-1 overflow-hidden bg-border">
                          <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.level}%` }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-y-0 left-0 bg-primary"
                          />
                        </div>
                        <span className="w-10 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                          {s.years ? `${s.years}y` : ""}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
