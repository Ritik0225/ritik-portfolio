"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { navItems, sectionIds } from "@/constants/nav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { personal } from "@/data";

export function Navbar() {
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openCommandPalette = React.useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-3 z-50 mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:top-5",
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 sm:px-4",
            scrolled
              ? "border-border/70 bg-background/70 shadow-[0_8px_32px_-8px_hsl(var(--background)/0.5)] backdrop-blur-xl"
              : "border-transparent bg-background/30 backdrop-blur-sm",
          )}
        >
          {/* Brand */}
          <Link
            href="/"
            aria-label={`${personal.name} — home`}
            className="group flex items-center gap-2 pl-1 pr-3"
          >
            <span
              aria-hidden
              className="brand-gradient-bg relative grid h-7 w-7 place-items-center rounded-md text-[10px] font-bold text-white"
            >
              {personal.shortName.charAt(0)}
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:inline">
              {personal.name}
            </span>
          </Link>

          {/* Nav */}
          <nav
            aria-label="Primary"
            className="relative hidden items-center gap-1 md:flex"
          >
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-muted/80"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="font-mono">⌘K</span>
            </button>
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={personal.resumeUrl} download>
                <Download className="h-3.5 w-3.5" />
                Resume
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.nav
              aria-label="Mobile primary"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-24 rounded-2xl border border-border/70 bg-background/95 p-4 shadow-2xl backdrop-blur-xl"
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-foreground/90 hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-border/70 pt-3">
                <Button asChild size="md" className="w-full">
                  <a href={personal.resumeUrl} download>
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
