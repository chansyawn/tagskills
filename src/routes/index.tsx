import { createFileRoute } from "@tanstack/react-router";

import { Button, buttonVariants } from "@/ui/components/button.tsx";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <section className="mx-auto flex min-h-svh w-full max-w-5xl flex-col items-center justify-center gap-10 px-6 py-16 text-center">
      <div className="space-y-4">
        <p className="text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase">
          tagskills
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Vite+ React stack is ready.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
          This starter is wired with React, Tailwind CSS v4, shadcn/ui, and TanStack Router
          file-based routing.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Start building</Button>
        <a
          className={buttonVariants({ variant: "outline" })}
          href="https://tanstack.com/router/latest"
          rel="noreferrer"
          target="_blank"
        >
          Router docs
        </a>
      </div>
    </section>
  );
}
