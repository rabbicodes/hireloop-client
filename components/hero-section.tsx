import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Search,
  
  Users,
  Award,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import globe from "@/app/images/globe.png"
import banner from '@/app/images/cta-bg.png'

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

const stats = [
  { icon: BriefcaseBusiness, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Award, value: "97%", label: "Satisfaction Rate" },
]

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="mt-9">
  <Image src={banner} alt="banner"/>
</div>
    <div className="relative bottom-222">
       <div className="mx-auto h-220 w-full">
  <Image
    src={globe}
    alt="HireLoop connecting job seekers with companies worldwide"
    priority
    className="mx-auto h-full w-full object-cover object-center drop-shadow-[0_0_60px_rgba(92,83,254,0.35)]"
  />
</div>

     
       <div className="mx-auto relative bottom-230 w-full max-w-5xl px-4 pb-16 pt-14  text-center sm:px-6 sm:pt-20 lg:pt-24">
        <div>
          <hr className="w-80 text-gray-500 border-t-3   relative top-4 mx-auto"/>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-[11px] font-medium tracking-wide text-muted-foreground backdrop-blur sm:text-xs">
          <BriefcaseBusiness className="size-3.5  text-amber-500" />
         <span className="text-white"> 50,000+</span> NEW JOBS THIS MONTH
        </div>

        <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <form
          action="/jobs"
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-xl border border-border/70 bg-card/70 p-2 text-left shadow-2xl shadow-black/40 backdrop-blur sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              aria-label="Job title, skill or company"
              placeholder="Job title, skill or company"
              className="h-11 border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="relative flex-1 sm:border-l sm:border-border/70 sm:pl-2">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="location"
              aria-label="Location or Remote"
              placeholder="Location or Remote"
              className="h-11 border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            aria-label="Search jobs"
            className="size-11 shrink-0 self-end rounded-lg sm:self-auto"
          >
            <ArrowRight className="size-4" />
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm">
          <span className="text-muted-foreground">Trending Position</span>
          {trending.map((item) => (
            <Link
              key={item}
              href="/jobs"
              className="rounded-md font-medium text-foreground/85 underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              {item}
            </Link>
          ))}
        </div>

      
      </div>
      
 <div className="relative bottom-190">
  <h1 className=" text-[30px] text-white text-center">
    Assisting over 15,000 job seekers <br />find their dream positions.
  </h1>
 </div>

     <div className="relative py-9 bottom-185">
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
    {stats.map(({ icon: Icon, value, label }) => (
      <div
        key={label}
        className="flex h-36 flex-col justify-between rounded-xl border border-white/10 bg-linear-to-b from-black to-[#171717] p-4 text-left shadow-lg"
      >
        <div className="flex size-8 items-center justify-center text-white/80">
          <Icon className="size-4" />
        </div>

        <div className="space-y-1">
          <div className="text-3xl font-semibold tracking-tight text-white">
            {value}
          </div>

          <div className="text-xs text-gray-400">
            {label}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
    </section>
  )
}
