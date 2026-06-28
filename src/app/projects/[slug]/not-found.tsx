import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-display-sm font-semibold tracking-tight">
        Project not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The project you're looking for has either moved or never existed.
      </p>
      <Button asChild className="mt-8">
        <Link href="/#work">
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
      </Button>
    </div>
  );
}
