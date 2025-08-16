import { z } from "zod";

export const AddJobSchema = z.object({
  jobImage: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Job image is required",
    }),
  jobImagePreview: z.string().optional(),
  title: z.string().min(1, "Job title is required"),
  postingDate: z.date().default(new Date()),
  status: z.string().min(1, "Status is required"),
  category: z.string().min(1, "Category is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  education: z
    .array(
      z.object({
        title: z.string(),
      })
    )
    .min(1, "At least one value is required"),
  company: z.string().min(1, "Company is required"),
  aboutCompany: z.string().min(1, "About company is required"),
  aboutJob: z.string().min(1, "About job is required"),
  rolesAndReponsibilities: z
    .string()
    .min(1, "Roles & Reponsibilities is required"),
  goodToHave: z.string().min(1, "Good to have is required"),
  externalLink: z.url().optional(),
  jobId: z.string().optional(),
});

export const EditJobSchema = z.object({
  jobImage: z.any(),
  jobImagePreview: z.string().optional(),
  title: z.string().min(1, "Job title is required"),
  postingDate: z.date().default(new Date()),
  status: z.string().min(1, "Status is required"),
  category: z.string().min(1, "Category is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  education: z
    .array(
      z.object({
        title: z.string(),
      })
    )
    .min(1, "At least one value is required"),
  company: z.string().min(1, "Company is required"),
  aboutCompany: z.string().min(1, "About company is required"),
  aboutJob: z.string().min(1, "About job is required"),
  rolesAndReponsibilities: z
    .string()
    .min(1, "Roles & Reponsibilities is required"),
  goodToHave: z.string().min(1, "Good to have is required"),
  externalLink: z.url().optional(),
  jobId: z.string().optional(),
});
