"use server"

import { revalidatePath } from "next/cache"

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const CreateJob = async (data: {
  [key: string]: FormDataEntryValue | boolean;
}) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create job");
  }

  const result = await res.json();

  revalidatePath("/dashboard/recruiter/jobs");

  return result;
};

export const DeleteJob = async (jobid: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobid}`, {
    method: "DELETE",
  });

  return res.json();
};

export const UpdateJob = async (
  jobid: string,
  data: {
    [key: string]: FormDataEntryValue | boolean;
  }
) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
