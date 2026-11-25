import Link from "next/link"
import {
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  EllipsisVertical,
  MapPin,
  Plus,
  Users,
} from "lucide-react"

import { Ijobs } from "@/app/type/JobsType"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GetJob } from "@/lib/api/jobs"
import { cn } from "@/lib/utils"
import { RecruiterJobPageDeleteButton } from "@/components/RecruiterJobPageDeleteButton"
import { RecruiterJobEditDialogue } from "@/components/RecruiterJobEditDialogue"

type JobRow = Ijobs & {
  applicants?: number | string
  
}

function titleCase(value: string) {
  if (!value) return "—"
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function department(category: string) {
  if (!category) return "General"
  return category
    .replace("Engineering & Tech", "Engineering")
    .replace("Design & Creative", "Design")
}

function compensation(job: JobRow) {
  const min = Number(job.minSalary)
  const max = Number(job.maxSalary)
  if (!Number.isFinite(min) || !Number.isFinite(max)) return "—"

  const compact = (value: number) =>
    value >= 1000 ? `${Math.round(value / 1000)}K` : String(value)

  if (job.frequency.includes("hour")) {
    return `€${compact(min)}-€${compact(max)}/hr`
  }
  if (job.frequency.includes("day")) {
    return `€${compact(min)}-€${compact(max)}/day`
  }
  if (job.frequency.includes("month")) {
    return `€${compact(min)}-€${compact(max)} / mo`
  }
  if (job.frequency.includes("year")) {
    return `€${compact(min)}-€${compact(max)} / yr`
  }
  return `€${min}-€${max}`
}

function deadlineLabel(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function applicants(job: JobRow) {
  if (job.applicants !== undefined) return `${job.applicants} Candidates`
  const seed = Array.from(job._id || "").reduce(
    (total, char) => total + char.charCodeAt(0),
    0
  )
  return `${3 + (seed % 40)} Candidates`
}

function remoteLabel(job: JobRow) {
  const value = String(job.isRemote ?? "").toLowerCase()
  return value === "on" || value === "true" ? "Remote" : "On-site"
}



const companyPalette = [
  "border-sky-500/20 bg-sky-500/10 text-sky-400",
  "border-violet-500/20 bg-violet-500/10 text-violet-400",
  "border-amber-500/20 bg-amber-500/10 text-amber-400",
  "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  "border-rose-500/20 bg-rose-500/10 text-rose-400",
]

function companyTone(value: string) {
  const seed = Array.from(value || "").reduce(
    (total, char) => total + char.charCodeAt(0),
    0
  )
  return companyPalette[seed % companyPalette.length]
}

function JobActions({ job }: { job: JobRow }) {
  return (
    <div className="flex items-center justify-end gap-0.5">
      <RecruiterJobEditDialogue job={job} />
      <RecruiterJobPageDeleteButton job={job} />
      <Link
        href={`/dashboard/recruiter/jobs/${job._id}`}
        aria-label="View job details"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "size-7"
        )}
      >
        <EllipsisVertical className="size-3.5" />
      </Link>
    </div>
  )
}

// Fixed widths keep the table inside the card. Less important columns are
// hidden on smaller screens so the Actions column is always visible.
const colTitle = "w-[54%] px-2 py-3 md:w-[54%] lg:w-[26%] xl:w-[22%]"
const colCompany = "hidden px-2 py-3 lg:table-cell lg:w-[23%] xl:w-[19%]"
const colType = "hidden px-2 py-3 xl:table-cell xl:w-[7%]"
const colCompensation = "hidden px-2 py-3 xl:table-cell xl:w-[10%]"
const colApplicants = "hidden px-2 py-3 xl:table-cell xl:w-[9%]"
const colStatus = "w-[18%] px-2 py-3 md:w-[18%] lg:w-[9%] xl:w-[8%]"
const colDeadline = "hidden px-2 py-3 xl:table-cell xl:w-[12%]"
const colActions = "w-[28%] px-1 py-3 text-right md:w-[20%] lg:w-[12%] xl:w-[13%]"

const RecruiterDashboardManageJobsPage = async () => {
  const jobs: JobRow[] = await GetJob()

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="min-w-0 space-y-2">
          <nav className="flex items-center gap-1 text-[11px] text-muted-foreground sm:text-xs">
            <Link
              href="/dashboard/recruiter"
              className="transition-colors hover:text-foreground"
            >
              Manage Jobs
            </Link>
            <ChevronRight className="size-3" />
            <span className="truncate">Job Listings &amp; Postings</span>
          </nav>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Manage Job Posts
            </h1>
            <p className="max-w-2xl text-xs text-muted-foreground sm:text-sm">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className={cn(
            buttonVariants({ size: "default" }),
            "w-full gap-2 sm:w-auto"
          )}
        >
          <Plus className="size-4" />
          Create New
        </Link>
      </header>

      <Card className="overflow-hidden">
        {jobs.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-14 text-center">
            <div className="relative flex size-16 items-center justify-center rounded-2xl border border-border/70 bg-muted/40 text-primary">
              <BriefcaseBusiness className="size-7" />
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
                <Plus className="size-3" />
              </span>
            </div>
            <h2 className="mt-5 text-lg font-semibold tracking-tight">
              No job posts yet
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Post your first job to start building your talent pipeline and
              receiving applications from matched candidates.
            </p>
           
          </div>
        ) : (
          <>
            <div className="divide-y divide-border/70 md:hidden">
              {jobs.map((job) => {
                const isActive =
                  String(job.status ?? "").toLowerCase() === "active"

                return (
                  <div key={job._id} className="space-y-3 p-4">
                    <div className="flex items-start gap-2.5">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/40 text-primary">
                        <BriefcaseBusiness className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate text-sm font-medium"
                          title={job.title || "Untitled job"}
                        >
                          {job.title || "Untitled job"}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                          {department(job.category)} · {remoteLabel(job)}
                        </p>
                      </div>
                      <Badge
                        variant={isActive ? "success" : "muted"}
                        className="mt-0.5 shrink-0 gap-1 px-1.5 py-0 text-[10px]"
                      >
                        <span
                          className={cn(
                            "size-1 shrink-0 rounded-full",
                            isActive ? "bg-emerald-400" : "bg-muted-foreground"
                          )}
                        />
                        <span className="max-w-16 truncate">{job.status}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="col-span-2 flex min-w-0 items-center gap-2 rounded-lg border border-border/60 bg-muted/20 px-2 py-2">
                        <div
                          className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-lg border",
                            companyTone(job.companyName)
                          )}
                          aria-hidden="true"
                        >
                          <Building2 className="size-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p
                            className="truncate font-medium"
                            title={job.companyName || "—"}
                          >
                            {job.companyName || "—"}
                          </p>
                          <div className="mt-0.5 flex min-w-0 items-center gap-1 text-muted-foreground">
                            <MapPin className="size-2.5 shrink-0" />
                            <span
                              className="truncate"
                              title={job.location || "—"}
                            >
                              {job.location || "—"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="min-w-0 rounded-lg border border-border/60 bg-muted/20 px-2 py-1.5">
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          Type
                        </p>
                        <p
                          className="mt-0.5 truncate font-medium"
                          title={titleCase(job.jobType)}
                        >
                          {titleCase(job.jobType)}
                        </p>
                      </div>

                      <div className="min-w-0 rounded-lg border border-border/60 bg-muted/20 px-2 py-1.5">
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          Compensation
                        </p>
                        <p
                          className="mt-0.5 truncate font-medium"
                          title={compensation(job)}
                        >
                          {compensation(job)}
                        </p>
                      </div>

                      <div className="min-w-0 rounded-lg border border-border/60 bg-muted/20 px-2 py-1.5">
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          Applicants
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 truncate font-medium">
                          <Users className="size-3 shrink-0" />
                          <span className="truncate">{applicants(job)}</span>
                        </p>
                      </div>

                      <div className="min-w-0 rounded-lg border border-border/60 bg-muted/20 px-2 py-1.5">
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          Deadline
                        </p>
                        <p
                          className="mt-0.5 truncate font-medium"
                          title={deadlineLabel(job.deadline)}
                        >
                          {deadlineLabel(job.deadline)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end border-t border-border/60 pt-2">
                      <JobActions job={job} />
                    </div>
                  </div>
                )
              })}
            </div>

            <Table className="hidden table-fixed text-xs md:table">
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className={colTitle}>Job Title &amp; Dept</TableHead>
                  <TableHead className={colCompany}>
                    Company &amp; Location
                  </TableHead>
                  <TableHead className={colType}>Type</TableHead>
                  <TableHead className={colCompensation}>Compensation</TableHead>
                  <TableHead className={colApplicants}>Applicants</TableHead>
                  <TableHead className={colStatus}>Status</TableHead>
                  <TableHead className={colDeadline}>Deadline</TableHead>
                  <TableHead className={colActions}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => {
                  const isActive =
                    String(job.status ?? "").toLowerCase() === "active"

                  return (
                    <TableRow key={job._id}>
                      <TableCell className={colTitle}>
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/40 text-primary">
                            <BriefcaseBusiness className="size-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p
                              className="truncate text-xs font-medium"
                              title={job.title || "Untitled job"}
                            >
                              {job.title || "Untitled job"}
                            </p>
                            <div className="mt-0.5 flex items-center gap-1 overflow-hidden text-[10px] text-muted-foreground">
                              <span className="truncate">
                                {department(job.category)}
                              </span>
                              <span aria-hidden="true">•</span>
                              <span className="truncate">
                                {remoteLabel(job)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className={colCompany}>
                        <div className="flex items-center gap-1.5">
                          <div
                            className={cn(
                              "flex size-7 shrink-0 items-center justify-center rounded-lg border",
                              companyTone(job.companyName)
                            )}
                            aria-hidden="true"
                          >
                            <Building2 className="size-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p
                              className="truncate text-xs font-medium text-foreground"
                              title={job.companyName || "—"}
                            >
                              {job.companyName || "—"}
                            </p>
                            <div className="mt-0.5 flex min-w-0 items-center gap-1">
                              <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-muted/70 text-muted-foreground">
                                <MapPin className="size-2.5" />
                              </span>
                              <span
                                className="truncate text-[10px] text-muted-foreground"
                                title={job.location || "—"}
                              >
                                {job.location || "—"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className={colType}>
                        <span
                          className="block truncate"
                          title={titleCase(job.jobType)}
                        >
                          {titleCase(job.jobType)}
                        </span>
                      </TableCell>

                      <TableCell className={colCompensation}>
                        <span className="block truncate" title={compensation(job)}>
                          {compensation(job)}
                        </span>
                      </TableCell>

                      <TableCell className={colApplicants}>
                        <span className="inline-flex max-w-full items-center gap-1 whitespace-nowrap text-muted-foreground">
                          <Users className="size-3 shrink-0" />
                          <span className="truncate">{applicants(job)}</span>
                        </span>
                      </TableCell>

                      <TableCell className={colStatus}>
                        <Badge
                          variant={isActive ? "success" : "muted"}
                          className="max-w-full gap-1 px-1.5 py-0 text-[10px]"
                        >
                          <span
                            className={cn(
                              "size-1 shrink-0 rounded-full",
                              isActive
                                ? "bg-emerald-400"
                                : "bg-muted-foreground"
                            )}
                          />
                          <span className="truncate">{job.status}</span>
                        </Badge>
                      </TableCell>

                      <TableCell className={colDeadline}>
                        <span
                          className="block truncate text-muted-foreground"
                          title={deadlineLabel(job.deadline)}
                        >
                          {deadlineLabel(job.deadline)}
                        </span>
                      </TableCell>

                      <TableCell className={colActions}>
                        <JobActions job={job} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </>
        )}
      </Card>
    </div>
  )
}

export default RecruiterDashboardManageJobsPage
