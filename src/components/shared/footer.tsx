import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { personal, socials } from "@/data";
import { navItems } from "@/constants/nav";

const ICON_MAP: Record<string, React.ReactNode> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background/60">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="brand-gradient-bg grid h-9 w-9 place-items-center rounded-md text-sm font-bold text-white"
              >
                {personal.shortName.charAt(0)}
              </span>
              <span className="text-base font-semibold">{personal.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {personal.role} — building scalable, production-grade web
              applications with care for performance and craft.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-card/40 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  {ICON_MAP[s.platform] ?? <Mail className="h-4 w-4" />}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Navigate
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {navItems.map((n) => (
                <li key={n.id}>
                  <Link
                    href={n.href}
                    className="text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Built with
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5 text-xs">
              {[
                "Next.js 15",
                "TypeScript",
                "Tailwind",
                "Framer Motion",
                "React Three Fiber",
                "shadcn/ui",
                "Lenis",
              ].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border/70 bg-card/40 px-2.5 py-1 font-mono text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Designed & engineered end-to-end.
          </p>
        </div>
      </div>
    </footer>
  );
}
