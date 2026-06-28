"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/shared/section-heading";
import { Magnetic } from "@/components/animations/magnetic";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { personal, socials } from "@/data";

export function Contact() {
  const [success, setSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", honeypot: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }
      setSuccess(true);
      reset();
      toast.success("Message sent — I'll be in touch shortly.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send";
      toast.error(msg);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left — copy + meta */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Let's Talk"
              title="Have a project in mind?"
              description="Open to senior engineering roles, contracts, and high-trust freelance work. I'll get back to every serious inquiry within 24 hours."
            />

            <ul className="mt-10 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-border bg-card/50 text-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Email
                  </p>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-foreground hover:text-primary"
                  >
                    {personal.email}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-border bg-card/50 text-foreground">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Based in
                  </p>
                  <p className="text-foreground">{personal.location}</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-2">
              {socials
                .filter((s) => s.platform !== "email")
                .map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3.5 py-1.5 text-xs transition-colors hover:border-foreground/30"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card/40 p-6 sm:p-8">

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 py-10 text-center"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 className="h-7 w-7" />
                    </span>
                    <h3 className="text-xl font-semibold">Message sent</h3>
                    <p className="max-w-md text-sm text-muted-foreground">
                      Thanks for reaching out. I'll get back to you within 24
                      hours.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSuccess(false)}
                    >
                      Send another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="relative space-y-5"
                  >
                    {/* Honeypot */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="sr-only"
                      {...register("honeypot")}
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Name"
                        htmlFor="name"
                        error={errors.name?.message}
                      >
                        <Input
                          id="name"
                          autoComplete="name"
                          placeholder="Jane Doe"
                          aria-invalid={!!errors.name}
                          {...register("name")}
                        />
                      </Field>
                      <Field
                        label="Email"
                        htmlFor="email"
                        error={errors.email?.message}
                      >
                        <Input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          aria-invalid={!!errors.email}
                          {...register("email")}
                        />
                      </Field>
                    </div>

                    <Field
                      label="Message"
                      htmlFor="message"
                      error={errors.message?.message}
                    >
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="Tell me about your project, timeline, and what success looks like…"
                        aria-invalid={!!errors.message}
                        {...register("message")}
                      />
                    </Field>

                    <div className="flex items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-muted-foreground">
                        I'll never share your information.
                      </p>
                      <Magnetic>
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          aria-busy={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-r-transparent" />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send message
                              <Send className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </Magnetic>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={htmlFor}>{label}</Label>
        {error && (
          <span className="text-[11px] text-red-400">{error}</span>
        )}
      </div>
      {children}
    </div>
  );
}
