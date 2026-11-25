import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Globe2,
  Layers3,
  MapPin,
} from "lucide-react"

import { Ijobs } from "@/app/type/JobsType"
import { RecruiterJobEditDialogue } from "@/components/RecruiterJobEditDialogue"
import { RecruiterJobPageDeleteButton } from "@/components/RecruiterJobPageDeleteButton"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GetDetailsJob } from "@/lib/api/jobs"
import { cn } from "@/lib/utils"

type PageProps = {
  params: Promise<{ id: string }>
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

function isRemoteJob(job: Ijobs) {
  const value = String(job.isRemote ?? "").toLowerCase()
  return value === "on" || value === "true"
}

function isActiveJob(job: Ijobs) {
  return String(job.status ?? "").toLowerCase() === "active"
}

function compensation(job: Ijobs) {
  const min = Number(job.minSalary)
  const max = Number(job.maxSalary)
  if (!Number.isFinite(min) || !Number.isFinite(max)) return "—"

  const compact = (value: number) =>
    value >= 1000 ? `${Math.round(value / 1000)}K` : String(value)

  const frequency = String(job.frequency ?? "").toLowerCase()
  if (frequency.includes("hour")) return `€${compact(min)}–€${compact(max)}/hr`
  if (frequency.includes("day")) return `€${compact(min)}–€${compact(max)}/day`
  if (frequency.includes("month")) return `€${compact(min)}–€${compact(max)}/mo`
  if (frequency.includes("year")) return `€${compact(min)}–€${compact(max)}/yr`
  return `€${compact(min)}–€${compact(max)}`
}

function frequencyLabel(value: string) {
  const normalized = String(value ?? "").toLowerCase()
  if (normalized.includes("hour")) return "Per hour"
  if (normalized.includes("day")) return "Per day"
  if (normalized.includes("month")) return "Per month"
  if (normalized.includes("year")) return "Per year"
  return value ? titleCase(value) : "—"
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

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/20 p-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground ring-1 ring-foreground/10">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium" title={value}>
          {value}
        </p>
      </div>
    </div>
  )
}

function StatTile({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 truncate text-lg font-semibold tracking-tight" title={value}>
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

const RecruiterJobsDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params
  const job: Ijobs = await GetDetailsJob(id)

  if (!job?._id) notFound()

  const active = isActiveJob(job)
  const remote = isRemoteJob(job)

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <header className="space-y-4">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link
            href="/dashboard/recruiter/jobs"
            className="transition-colors hover:text-foreground"
          >
            Manage Jobs
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate">Job Details</span>
        </nav>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3.5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/40 text-primary">
              <BriefcaseBusiness className="size-5" />
            </div>

            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {job.title || "Untitled job"}
                </h1>
                <Badge
                  variant={active ? "success" : "muted"}
                  className="gap-1.5 px-2 py-0.5"
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      active ? "bg-emerald-400" : "bg-muted-foreground"
                    )}
                  />
                  {job.status || "Unknown"}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="size-3.5" />
                  {job.companyName || "—"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  {remote ? (
                    <Globe2 className="size-3.5" />
                  ) : (
                    <MapPin className="size-3.5" />
                  )}
                  {remote ? "Remote" : "On-site"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {job.location || "—"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="outline">{department(job.category)}</Badge>
                <Badge variant="outline">{titleCase(job.jobType)}</Badge>
                <Badge variant="outline">
                  {job.frequency ? frequencyLabel(job.frequency) : "Salary not set"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link
              href="/dashboard/recruiter/jobs"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "gap-2"
              )}
            >
              <ArrowLeft className="size-4" />
              Back to Jobs
            </Link>

            <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-card p-1">
              <RecruiterJobEditDialogue job={job} />
              <RecruiterJobPageDeleteButton job={job} />
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job overview</CardTitle>
              <CardDescription>
                The key details candidates see when reviewing this role.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <StatTile
                  label="Department"
                  value={department(job.category)}
                  hint={job.category || "No category selected"}
                />
                <StatTile
                  label="Employment type"
                  value={titleCase(job.jobType)}
                  hint={remote ? "Remote work allowed" : "On-site position"}
                />
                <StatTile
                  label="Salary range"
                  value={compensation(job)}
                  hint={
                    job.frequency ? frequencyLabel(job.frequency) : "Not specified"
                  }
                />
                <StatTile
                  label="Application deadline"
                  value={deadlineLabel(job.deadline)}
                  hint={active ? "Accepting applications" : "Not accepting applications"}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About this role</CardTitle>
              <CardDescription>
                Responsibilities and requirements for this position.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BriefcaseBusiness className="size-3.5" />
                  </span>
                  <h2 className="text-sm font-semibold">Key responsibilities</h2>
                </div>
                <p className="whitespace-pre-line pl-9 text-sm leading-relaxed text-muted-foreground">
                  {job.responsibilities || "No responsibilities have been added."}
                </p>
              </section>

              <div className="border-t border-border/70" />

              <section className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Layers3 className="size-3.5" />
                  </span>
                  <h2 className="text-sm font-semibold">
                    Qualifications &amp; requirements
                  </h2>
                </div>
                <p className="whitespace-pre-line pl-9 text-sm leading-relaxed text-muted-foreground">
                  {job.qualifications || "No qualifications have been added."}
                </p>
              </section>
            </CardContent>
          </Card>
        </div>

        <aside className="min-w-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
              <CardDescription>Additional listing information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <DetailRow
                icon={Building2}
                label="Company"
                value={job.companyName || "—"}
              />
              <DetailRow
                icon={MapPin}
                label="Location"
                value={job.location || "—"}
              />
              <DetailRow
                icon={Layers3}
                label="Category"
                value={job.category || "General"}
              />
              <DetailRow
                icon={Clock3}
                label="Deadline"
                value={deadlineLabel(job.deadline)}
              />
              <DetailRow
                icon={CircleDollarSign}
                label="Pay frequency"
                value={job.frequency ? frequencyLabel(job.frequency) : "—"}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application window</CardTitle>
              <CardDescription>
                Current state of this job post.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-3.5",
                  active
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-border/70 bg-muted/20"
                )}
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg",
                    active
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <CalendarDays className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">
                    {active ? "Accepting applications" : "Applications closed"}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {active
                      ? `Candidates can apply until ${deadlineLabel(job.deadline)}.`
                      : "This listing is not currently accepting new candidates."}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Job ID
                </p>
                <p className="mt-1 break-all font-mono text-[11px] text-foreground/80">
                  {job._id}
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

export default RecruiterJobsDetailsPage
