"use client"
import { Ijobs } from "@/app/type/JobsType"
import { useRouter } from "next/navigation"
import React from "react"

const JOB_TYPE_FILTERS = [
  { value: "full-time", label: "Full-time" },
  { value: "contract", label: "Contract" },
  { value: "part-time", label: "Part-time" },
  { value: "internship", label: "Internship" },
]

const JobFilter = ({ jobs }: { jobs: Ijobs[] }) => {
    const router = useRouter()
  const handleRadioFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name
    const parmas = new URLSearchParams()
    parmas.set(`${name}`,value)
   router.push(`/browse-jobs?${parmas}`)
  }

  const jobTypeCounts = JOB_TYPE_FILTERS.map((filter) => ({
    ...filter,
    count: jobs.filter((job) => job.jobType?.toLowerCase() === filter.value)
      .length,
  }))
  return (
    <div>
      <aside className="w-full rounded-lg bg-[#141418] p-[18px] sm:w-[200px] sm:shrink-0">
        <h2 className="text-sm font-semibold text-white">Filters</h2>

        <fieldset className="mt-5">
          <legend className="text-xs font-medium text-[#71717A]">
            Job Type
          </legend>

          <div className="mt-3 space-y-3">
            {jobTypeCounts.map((filter, index) => (
              <label
                key={filter.value}
                className="flex cursor-pointer items-center gap-3 text-[13px] text-[#EDEDF0]"
              >
                <input
                  type="radio"
                  onChange={handleRadioFilter}
                  name="jobType"
                  value={filter.value}
                  defaultChecked={index === 0}
                  className="size-4 shrink-0 cursor-pointer accent-white"
                />
                <span>{filter.label}</span>
                <span className="ml-auto text-xs text-[#71717A]">
                  {filter.count}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </aside>
    </div>
  )
}

export default JobFilter
