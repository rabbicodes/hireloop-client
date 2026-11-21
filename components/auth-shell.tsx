import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import logo from "@/app/images/logo.png"

type AuthShellProps = {
  mode: "sign-in" | "sign-up"
  title: string
  description: string
  children: React.ReactNode
}

export function AuthShell({
  mode,
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[32rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Link
            href="/"
            aria-label="HireLoop home"
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <Image
              src={logo}
              alt="HireLoop"
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
          <nav
            aria-label="Authentication"
            className="grid grid-cols-2 gap-1 rounded-lg border border-border/60 bg-background/60 p-1"
          >
            <Link
              href="/sign-in"
              aria-current={mode === "sign-in" ? "page" : undefined}
              className={cn(
                "rounded-md py-2 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                mode === "sign-in"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              )}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              aria-current={mode === "sign-up" ? "page" : undefined}
              className={cn(
                "rounded-md py-2 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                mode === "sign-up"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              )}
            >
              Sign up
            </Link>
          </nav>

          <div className="mt-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  )
}
