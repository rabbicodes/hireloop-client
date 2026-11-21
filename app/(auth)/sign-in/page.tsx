'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Lock, Mail } from "lucide-react"

import { AuthShell } from "@/components/auth-shell"
import { GithubIcon } from "@/components/github-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import googleLogo from "@/app/images/logos/google.png"
import { authClient } from "@/lib/auth-client"

export default function SignInPage() {
     const onSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data= Object.fromEntries(formData.entries())
        console.log('form data:',data);
    
       const { data:resData, error } = await authClient.signIn.email({
    email: data.email as string, // required, The email address of the user.
    password: data.password as string, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
    rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
    callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
});
    console.log(resData,error);
       
      };

  return (
    <AuthShell
      mode="sign-in"
      title="Welcome back"
      description="Sign in to your HireLoop account to continue."
    >
      <form className="space-y-4" onSubmit={onSubmit}>
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

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="h-11 pl-9"
            />
          </div>
        </div>


        <Button type="submit" className="h-11 w-full text-sm">
          Sign in
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-border/70" />
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          or continue with
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
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          Sign up
        </Link>
      </p>
    </AuthShell>
  )
}
