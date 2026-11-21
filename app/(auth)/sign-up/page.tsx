"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Building2, Lock, Mail, ShieldCheck, User } from "lucide-react"

import { AuthShell } from "@/components/auth-shell"
import { GithubIcon } from "@/components/github-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signUp } from "@/lib/auth-client"
import googleLogo from "@/app/images/logos/google.png"

const accountTypes = [
  { value: "sekkers", label: "Job seeker", icon: User },
  { value: "recruiter", label: "Recruiter", icon: Building2 },
  { value: "admin", label: "Admin", icon: ShieldCheck },
] as const

export default function SignUpPage() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(formData.get("confirm-password") ?? "")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    const { error: authError } = await signUp.email({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password,
      role: String(formData.get("role") ?? "sekkers") as
        | "sekkers"
        | "recruiter"
        | "admin",
    })

    setLoading(false)

    if (authError) {
      setError(authError.message ?? "Unable to create account.")
      return
    }

    router.push("/")
  }

  return (
    <AuthShell
      mode="sign-up"
      title="Create your account"
      description="Join HireLoop and find your next opportunity."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              className="h-11 pl-9"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="h-11 pl-9"
              required
            />
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Account type</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {accountTypes.map(({ value, label, icon: Icon }) => (
              <label key={value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={value}
                  defaultChecked={value === "sekkers"}
                  className="peer sr-only"
                />
                <span className="flex h-full flex-col items-center justify-center gap-1.5 rounded-lg border border-border/70 bg-background/50 px-2 py-3 text-center text-xs text-muted-foreground transition-colors peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50">
                  <Icon className="size-4" />
                  {label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create password"
                className="h-11 pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-password" className="text-sm font-medium">
              Confirm password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat password"
                className="h-11 pl-9"
                required
              />
            </div>
          </div>
        </div>

        <label htmlFor="terms" className="flex items-start gap-2 text-sm text-muted-foreground">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 rounded border-border bg-background accent-primary"
            required
          />
          <span>
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <Button type="submit" className="h-11 w-full text-sm" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-border/70" />
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          or sign up with
        </span>
        <span className="h-px flex-1 bg-border/70" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" className="h-11 w-full">
          <Image src={googleLogo} alt="" className="size-4 object-contain" />
          Google
        </Button>
        <Button type="button" variant="outline" className="h-11 w-full">
          <GithubIcon className="size-4" />
          GitHub
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          Sign in
        </Link>
      </p>
    </AuthShell>
  )
}
