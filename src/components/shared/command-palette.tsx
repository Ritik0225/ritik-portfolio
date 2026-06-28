"use client";

import * as React from "react";
import { Command } from "cmdk";
import {
  ArrowRight,
  Download,
  FileText,
  FolderGit2,
  Github,
  Home,
  Linkedin,
  Mail,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { navItems } from "@/constants/nav";
import { personal, projects, socials } from "@/data";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ReactNode> = {
  work: <FolderGit2 className="h-4 w-4" />,
  skills: <Sparkles className="h-4 w-4" />,
  experience: <User className="h-4 w-4" />,
  philosophy: <FileText className="h-4 w-4" />,
  contact: <Mail className="h-4 w-4" />,
};

const SOCIAL_ICON: Record<string, React.ReactNode> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  twitter: <FileText className="h-4 w-4" />,
};

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(
        "open-command-palette",
        onOpen as EventListener,
      );
    };
  }, []);

  const close = React.useCallback(() => setOpen(false), []);

  const runAction = React.useCallback(
    (fn: () => void) => () => {
      fn();
      close();
    },
    [close],
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[14vh]"
    >
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={close}
        aria-hidden
      />
      <Command
        label="Command Menu"
        className={cn(
          "relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover/95 shadow-2xl backdrop-blur-xl",
          "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-muted-foreground/70",
        )}
      >
        <div className="flex items-center gap-3 border-b border-border/70 px-4">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
          <Command.Input
            autoFocus
            placeholder="Type a command or search…"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          <kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
            No results.
          </Command.Empty>

          <Command.Group heading="Navigate" className="px-1 pb-2">
            {navItems.map((item) => (
              <Command.Item
                key={item.id}
                value={`nav-${item.label}`}
                onSelect={runAction(() => {
                  const el = document.getElementById(item.id);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                })}
                className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-muted aria-selected:text-foreground"
              >
                <span className="text-muted-foreground group-aria-selected:text-foreground">
                  {ICONS[item.id] ?? <Home className="h-4 w-4" />}
                </span>
                <span className="flex-1">{item.label}</span>
                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-aria-selected:opacity-100" />
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Projects" className="px-1 pb-2 pt-1">
            {projects.slice(0, 5).map((p) => (
              <Command.Item
                key={p.slug}
                value={`project-${p.title}`}
                onSelect={runAction(() => {
                  window.location.href = `/projects/${p.slug}`;
                })}
                className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-muted"
              >
                <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1">{p.title}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {p.category}
                </span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions" className="px-1 pb-2 pt-1">
            <Command.Item
              value="resume-download"
              onSelect={runAction(() => {
                const a = document.createElement("a");
                a.href = personal.resumeUrl;
                a.download = "resume.pdf";
                a.click();
              })}
              className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-muted"
            >
              <Download className="h-4 w-4 text-muted-foreground" />
              Download Resume
            </Command.Item>
            <Command.Item
              value="toggle-theme"
              onSelect={runAction(() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark"),
              )}
              className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-muted"
            >
              <Sun className="h-4 w-4 text-muted-foreground" />
              Toggle theme
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Social" className="px-1 pb-2 pt-1">
            {socials.map((s) => (
              <Command.Item
                key={s.platform}
                value={`social-${s.label}`}
                onSelect={runAction(() => window.open(s.url, "_blank", "noopener,noreferrer"))}
                className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-muted"
              >
                <span className="text-muted-foreground">
                  {SOCIAL_ICON[s.platform] ?? <Github className="h-4 w-4" />}
                </span>
                <span className="flex-1">{s.label}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {s.handle}
                </span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between border-t border-border/70 px-4 py-2 text-[10px] text-muted-foreground">
          <span className="font-mono">{personal.name}</span>
          <span className="flex items-center gap-3 font-mono">
            <span>↵ select</span>
            <span>↑↓ navigate</span>
          </span>
        </div>
      </Command>
    </div>
  );
}
