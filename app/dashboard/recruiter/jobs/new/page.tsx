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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { CreateJob } from "@/lib/actions/jobs"
import { toast } from "@/components/ui/toast"

type FormFieldProps = {
  label: string
  htmlFor?: string
  required?: boolean
  hint?: string
  children: ReactNode
}

function FormField({
  label,
  htmlFor,
  required,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required ? (
          <span className="ml-0.5 text-primary">*</span>
        ) : null}
      </Label>

      {children}

      {hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

function SectionTitle({
  step,
  title,
}: {
  step: number
  title: string
}) {
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
  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const data: Record<string, FormDataEntryValue | boolean> = Object.fromEntries(
      formData.entries()
    )

    // Base UI Checkbox submits "on" when checked and nothing when unchecked.
    // Normalize it so the API always receives a real boolean.
    data.isRemote = formData.has("isRemote")

    await CreateJob(data)

    form.reset()

    toast.add({
      title: "Data added",
      description: "Data added successfully",
    })
  }

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
          <h1 className="text-2xl font-semibold tracking-tight">
            Post a New Job
          </h1>

          <p className="text-sm text-muted-foreground">
            Fill in the position specifications to post a new job across our network.
          </p>
        </div>
      </header>

      <form className="space-y-4 sm:space-y-6" onSubmit={onSubmit}>
        {/* Section 1: Basic Information */}
        <Card className="[--card-spacing:--spacing(3)] sm:[--card-spacing:--spacing(4)]">
          <CardHeader>
            <SectionTitle step={1} title="Basic Information" />
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-5">
            <FormField label="Job Title" htmlFor="job-title" required>
              <Input
                id="job-title"
                name="title"
                placeholder="e.g. Frontend Developer"
                className="h-10"
                required
              />
            </FormField>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <FormField
                label="Company Name"
                htmlFor="company-name"
                required
              >
                <div className="relative">
                  <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="company-name"
                    name="companyName"
                    className="h-10 pl-9"
                    required
                  />
                </div>
              </FormField>

              <FormField
                label="Job Category"
                htmlFor="job-category"
                required
              >
                <Select name="category" defaultValue="engineering">
                  <SelectTrigger id="job-category" className="h-10 w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="engineering">
                      Engineering & Tech
                    </SelectItem>
                    <SelectItem value="design">
                      Design & Creative
                    </SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Status" htmlFor="status" required>
                <Select name="status" defaultValue="active">
                  <SelectTrigger id="status" className="h-10 w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                   
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <FormField label="Job Type" required>
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
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

        {/* Section 2: Location, Compensation & Timeline */}
        <Card className="[--card-spacing:--spacing(3)] sm:[--card-spacing:--spacing(4)]">
          <CardHeader>
            <SectionTitle
              step={2}
              title="Location, Compensation & Timeline"
            />
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-5">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border/70 bg-muted/25 p-3">
              <Checkbox
                name="isRemote"
                defaultChecked
                className="mt-0.5"
              />


              <span className="space-y-0.5">
                <span className="block text-sm font-medium">
                  Remote Work Allowed{" "}
                  <span className="hidden font-normal text-muted-foreground sm:inline">
                    (isRemote)
                  </span>
                </span>

                <span className="block text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </span>
              </span>
            </label>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <FormField
                label="Job Location (location)"
                htmlFor="job-location"
              >
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

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              <FormField
                label="Min Salary / Rate"
                htmlFor="min-salary"
              >
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

              <FormField
                label="Max Salary / Rate"
                htmlFor="max-salary"
              >
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

              <FormField
                label="Frequency"
                htmlFor="salary-frequency"
              >
                <Select name="frequency" defaultValue="month">
                  <SelectTrigger id="salary-frequency" className="h-10 w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="hour">Per hour</SelectItem>
                    <SelectItem value="day">Per day</SelectItem>
                    <SelectItem value="month">Per month</SelectItem>
                    <SelectItem value="year">Per year</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Responsibilities & Requirements */}
        <Card className="[--card-spacing:--spacing(3)] sm:[--card-spacing:--spacing(4)]">
          <CardHeader>
            <SectionTitle
              step={3}
              title="Responsibilities & Requirements"
            />
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-5">
            <FormField
              label="Key Responsibilities"
              htmlFor="responsibilities"
              required
            >
              <Textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                className="min-h-24 resize-y leading-relaxed"
                required
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
                rows={4}
                className="min-h-24 resize-y leading-relaxed"
                required
              />
            </FormField>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="submit"
            size="lg"
            className="w-full gap-2 sm:w-auto"
          >
            <BriefcaseBusiness className="size-4" />
            Post Job
          </Button>
          <p className="text-center text-xs text-muted-foreground sm:text-right">
            Fields marked <span className="text-primary">*</span> are required
          </p>
        </div>
      </form>
    </div>
  )
}