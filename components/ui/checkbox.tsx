import * as React from "react"

import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn(
        "border-input bg-background accent-primary size-4 shrink-0 cursor-pointer rounded border shadow-xs disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Checkbox }
