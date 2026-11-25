"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { Building2, CalendarDays, Euro, MapPin, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "./ui/checkbox"
import { Textarea } from "./ui/textarea"
import { Ijobs } from "@/app/type/JobsType"
import { UpdateJob } from "@/lib/actions/jobs"
import { useRouter } from "next/navigation"

type FormFieldProps = {
  label: string
  htmlFor?: string
  required?: boolean
  children: ReactNode
}

function FormField({ label, htmlFor, required, children }: FormFieldProps) {
  return (
    <Field>
      <Label htmlFor={htmlFor} className="text-xs">
        {label}
        {required ? <span className="ml-0.5 text-primary">*</span> : null}
      </Label>
      {children}
    </Field>
  )
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

function isRemoteValue(value: string | boolean) {
  const normalized = String(value ?? "").toLowerCase()
  return normalized === "on" || normalized === "true"
}

export function RecruiterJobEditDialogue({ job }: { job: Ijobs }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data: Record<string, FormDataEntryValue | boolean> = Object.fromEntries(
      formData.entries()
    )

    // Base UI Checkbox submits "on" when checked and nothing when unchecked.
    // Normalize it so the API always receives a real boolean.
    data.isRemote = formData.has("isRemote")

    await UpdateJob(job._id, data)
    router.refresh()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Update job"
            className="flex size-7 items-center gap-2 lg:h-7 lg:w-auto lg:px-2"
          >
            <Pencil className="size-3.5" />
            
          </Button>
        }
      />

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-lg">Edit Job Post</DialogTitle>
          <DialogDescription>
            Update the job details below, then save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="max-h-[60vh] space-y-5 overflow-y-auto pr-1">
            <FieldSet>
              <FieldLegend className="text-sm">
                1 · Basic information
              </FieldLegend>
              <FieldGroup className="gap-4">
                <FormField label="Job Title" htmlFor="job-title" required>
                  <Input
                    id="job-title"
                    name="title"
                    placeholder="e.g. Frontend Developer"
                    className="h-9"
                    required
                    defaultValue={job.title}
                  />
                </FormField>

                <div className="grid gap-4 sm:grid-cols-2">
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
                        className="h-9 pl-9"
                        required
                        defaultValue={job.companyName}
                      />
                    </div>
                  </FormField>

                  <FormField
                    label="Job Category"
                    htmlFor="job-category"
                    required
                  >
                    <Select name="category" defaultValue={job.category}>
                      <SelectTrigger id="job-category" className="h-9 w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">
                          Engineering &amp; Tech
                        </SelectItem>
                        <SelectItem value="design">
                          Design &amp; Creative
                        </SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>

                  <FormField label="Status" htmlFor="status" required>
                    <Select name="status" defaultValue={job.status}>
                      <SelectTrigger id="status" className="h-9 w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>

                <FormField label="Job Type" required>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {jobTypes.map((type, index) => (
                      <label key={type} className="relative cursor-pointer">
                        <input
                          className="peer sr-only"
                          type="radio"
                          name="jobType"
                          value={type.toLowerCase()}
                          defaultChecked={index === 0}
                        />
                        <span className="flex h-9 items-center justify-center rounded-lg border border-border bg-background/40 text-xs font-medium text-muted-foreground transition-colors peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-foreground peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 hover:bg-muted/60">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </FormField>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend className="text-sm">
                2 · Location, compensation &amp; timeline
              </FieldLegend>
              <FieldGroup className="gap-4">
                <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-border/70 bg-muted/25 p-2.5">
                  <Checkbox
                    name="isRemote"
                    defaultChecked={isRemoteValue(job.isRemote)}
                    className="mt-0.5"
                  />
                  <span className="space-y-0.5">
                    <span className="block text-xs font-medium">
                      Remote work allowed
                    </span>
                    <span className="block text-[11px] text-muted-foreground">
                      Enable applications from distributed candidates
                    </span>
                  </span>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Job Location" htmlFor="job-location">
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="job-location"
                        name="location"
                        className="h-9 pl-9"
                        defaultValue={job.location}
                      />
                    </div>
                  </FormField>

                  <FormField
                    label="Application Deadline"
                    htmlFor="application-deadline"
                  >
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="application-deadline"
                        name="deadline"
                        type="date"
                        className="h-9 pl-9"
                        defaultValue={job.deadline}
                      />
                    </div>
                  </FormField>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <FormField label="Min Salary / Rate" htmlFor="min-salary">
                    <div className="relative">
                      <Euro className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="min-salary"
                        name="minSalary"
                        type="number"
                        min="0"
                        className="h-9 pl-9"
                        defaultValue={job.minSalary}
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
                        className="h-9 pl-9"
                        defaultValue={job.maxSalary}
                      />
                    </div>
                  </FormField>

                  <FormField label="Frequency" htmlFor="salary-frequency">
                    <Select name="frequency" defaultValue={job.frequency}>
                      <SelectTrigger
                        id="salary-frequency"
                        className="h-9 w-full"
                      >
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
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend className="text-sm">
                3 · Responsibilities &amp; requirements
              </FieldLegend>
              <FieldGroup className="gap-4">
                <FormField
                  label="Key Responsibilities"
                  htmlFor="responsibilities"
                  required
                >
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    rows={3}
                    className="resize-y leading-relaxed"
                    required
                    defaultValue={job.responsibilities}
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
                    rows={3}
                    className="resize-y leading-relaxed"
                    required
                    defaultValue={job.qualifications}
                  />
                </FormField>
              </FieldGroup>
            </FieldSet>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
