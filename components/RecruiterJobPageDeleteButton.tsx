'use client'
import { Trash2, Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DeleteJob } from "@/lib/actions/jobs"
import { useRouter } from "next/navigation"
import { toast } from "./ui/toast"
import { Ijobs } from "@/app/type/JobsType"

export function RecruiterJobPageDeleteButton({job}:{job:Ijobs}) {
    const router = useRouter()
    const jobid = job._id
    const handleDelete = async ()=>{
        const res = await DeleteJob(jobid)
        console.log(res);
        router.refresh()
        toast.add({
  title: job.title ,
  description: <span className="text-red-500">deleted permanantly</span>,
})
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Delete job"
                          className="size-7 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Post?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this Post. View{" "}
            <a href="#">Settings</a> delete any memories saved during this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
