"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import logo from "@/app/images/logo.png"
import { authClient } from "@/lib/auth-client"

export function Navbar() {
  const { data: session } = authClient.useSession()
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const handleSignout = async () => {
    await authClient.signOut()
  }
  const navigation = [
    { label: "Home", href: "/" },
    { label: "Browse Jobs", href: "/browse-jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: `/dashboard/${session?.user?.role}` },
  ]
  const navLinks = (
    <>
      <Link
        href="/sign-in"
        className={buttonVariants({ variant: "outline", size: "default" })}
      >
        Sign in
      </Link>
      <Link href="/sign-up" className={buttonVariants({ size: "default" })}>
        Get Started
      </Link>
    </>
  )
  return (
    <header className="sticky top-0 z-50 w-full bg-[#222222]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-md focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          aria-label="HireLoop home"
        >
          <Image
            src={logo}
            alt="HireLoop"
            priority
            className="h-9 w-auto object-contain sm:h-10"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
                  active && "text-foreground"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        {session?.user ? (
          <div className="hidden min-w-0 items-center gap-4 lg:flex">
            <h1 className="truncate text-sm font-medium">
              Welcome , {session?.user?.name}
            </h1>
            <Button className="shrink-0" onClick={handleSignout}>
              Sign out{" "}
            </Button>
          </div>
        ) : (
          <div className="hidden items-center gap-2 lg:flex">{navLinks}</div>
        )}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-border/70 bg-background px-4 pt-2 pb-5 sm:px-6 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navigation.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
                    active && "bg-accent/70 text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          {session?.user ? (
            <div className="flex min-w-0 items-center gap-4">
              <h1 className="truncate text-sm font-medium">
                Welcome , {session?.user?.name}
              </h1>
              <Button className="shrink-0" onClick={handleSignout}>
                Sign out{" "}
              </Button>
            </div>
          ) : (
            
              <div className="mt-4 flex flex-col gap-2">{navLinks}</div>
            
          )}
        </div>
      )}
    </header>
  )
}
