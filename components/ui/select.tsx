import * as React from "react"

import { cn } from "@/lib/utils"

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn(
        "border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full cursor-pointer rounded-lg border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export { Select }
