'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Lock, Mail, User } from "lucide-react"

import { AuthShell } from "@/components/auth-shell"
import { GithubIcon } from "@/components/github-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import googleLogo from "@/app/images/logos/google.png"
import { authClient } from "@/lib/auth-client"

export default function SignUpPage() {
     const onSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data= Object.fromEntries(formData.entries())
    console.log('form data:',data);

    const { data:resData, error } = await authClient.signUp.email({
    name: data.name as string, // required, The name of the user.
    email: data.email as string, // required, The email address of the user.
    password: data.password as string, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
   
    callbackURL: "/sign-in", // An optional URL to redirect to after the user signs up.
});
console.log(resData,error);
   
  };
  return (
    <AuthShell
      mode="sign-up"
      title="Create your account"
      description="Join HireLoop and find your next opportunity."
    >
      <form className="space-y-4" onSubmit={onSubmit}>
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
            />
          </div>
        </div>

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

        <Button type="submit" className="h-11 w-full text-sm">
          Create account
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
