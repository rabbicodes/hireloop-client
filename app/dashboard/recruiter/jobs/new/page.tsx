'use client'
import type { ReactNode } from "react"
import Link from "next/link"
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronRight,
  Euro,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type FormFieldProps = {
  label: string
  htmlFor?: string
  required?: boolean
  hint?: string
  children: ReactNode
}

function FormField({ label, htmlFor, required, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required ? <span className="ml-0.5 text-primary">*</span> : null}
      </Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

function SectionTitle({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-6 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
        {step}
      </span>
      <CardTitle>{title}</CardTitle>
    </div>
  )
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

export default function RecruiterNewAddJobsPage() {
     const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data= Object.fromEntries(formData.entries())
    console.log(data);
  };
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <header className="space-y-2">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link
            href="/dashboard/recruiter/jobs"
            className="transition-colors hover:text-foreground"
          >
            Manage Jobs
          </Link>
          <ChevronRight className="size-3" />
          <span>Create New Listing</span>
        </nav>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Post a New Job</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the position specifications to post a new job across our network.
          </p>
        </div>
      </header>

      <form className="space-y-6" onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <SectionTitle step={1} title="Basic Information" />
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField label="Job Title" htmlFor="job-title" required>
              <Input
                id="job-title"
                name="title"
                placeholder="e.g. Frontend Developer"
                className="h-10"
              />
            </FormField>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Company Name" htmlFor="company-name" required>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="company-name"
                    name="companyName"
                    className="h-10 pl-9"
                  />
                </div>
              </FormField>

              <FormField label="Job Category" htmlFor="job-category" required>
                <Select
                  id="job-category"
                  name="category"
                  className="h-10"
                >
                  <option>Engineering &amp; Tech</option>
                  <option>Design &amp; Creative</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Operations</option>
                </Select>
              </FormField>
            </div>

            <FormField label="Job Type" required>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {jobTypes.map((type, index) => (
                  <label key={type} className="relative cursor-pointer">
                    <input
                      className="peer sr-only"
                      type="radio"
                      name="jobType"
                      value={type.toLowerCase()}
                      defaultChecked={index === 0}
                    />
                    <span className="flex h-10 items-center justify-center rounded-lg border border-border bg-background/40 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-foreground peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionTitle step={2} title="Location, Compensation & Timeline" />
          </CardHeader>
          <CardContent className="space-y-5">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border/70 bg-muted/25 p-3">
              <Checkbox name="isRemote" defaultChecked className="mt-0.5" />
              <span className="space-y-0.5">
                <span className="block text-sm font-medium">
                  Remote Work Allowed{" "}
                  <span className="font-normal text-muted-foreground">(isRemote)</span>
                </span>
                <span className="block text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </span>
              </span>
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Job Location (location)" htmlFor="job-location">
                <div className="relative">
                  <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="job-location"
                    name="location"
                    className="h-10 pl-9"
                  />
                </div>
              </FormField>

              <FormField
                label="Application Deadline (deadline)"
                htmlFor="application-deadline"
              >
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="application-deadline"
                    name="deadline"
                    type="date"
                    className="h-10 pl-9"
                  />
                </div>
              </FormField>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <FormField label="Min Salary / Rate" htmlFor="min-salary">
                <div className="relative">
                  <Euro className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="min-salary"
                    name="minSalary"
                    type="number"
                    min="0"
                    className="h-10 pl-9"
                  />
                </div>
              </FormField>

              <FormField label="Max Salary / Rate" htmlFor="max-salary">
                <div className="relative">
                  <Euro className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="max-salary"
                    name="maxSalary"
                    type="number"
                    min="0"
                    className="h-10 pl-9"
                  />
                </div>
              </FormField>

              <FormField label="Frequency" htmlFor="salary-frequency">
                <Select
                  id="salary-frequency"
                  name="frequency"
                  className="h-10"
                >
                  <option>per hour</option>
                  <option>per day</option>
                  <option>per month</option>
                  <option>per year</option>
                </Select>
              </FormField>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionTitle step={3} title="Responsibilities & Requirements" />
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField
              label="Key Responsibilities"
              htmlFor="responsibilities"
              required
            >
              <Textarea
                id="responsibilities"
                name="responsibilities"
                rows={5}
                className="resize-y leading-relaxed"
                
              />
            </FormField>

            <FormField
              label="Qualifications & Requirements"
              htmlFor="qualifications"
              required
            >
              <Textarea
                id="qualifications"
                name="qualifications"
                rows={5}
                className="resize-y leading-relaxed"

              />
            </FormField>
          </CardContent>
        </Card>

        <div className="">
          
          <Button type="submit" size="lg" className="gap-2">
            <BriefcaseBusiness className="size-4" />
            Post Job
          </Button>
        </div>
      </form>
    </div>
  )
}
