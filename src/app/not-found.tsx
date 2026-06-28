import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[80vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-display-md font-semibold tracking-tight gradient-text">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Sorry, we couldn't find what you were looking for.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </Button>
    </div>
  );
}
