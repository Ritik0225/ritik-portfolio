import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal as="span" className="eyebrow">
          <span className="eyebrow-dot" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal as="h2" className="section-heading gradient-text text-balance">
        {title}
      </Reveal>
      {description && (
        <Reveal
          as="p"
          delay={0.05}
          className={cn(
            "max-w-2xl text-base text-muted-foreground sm:text-lg text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
}
