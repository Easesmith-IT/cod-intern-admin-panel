import { z } from "zod";

const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

export const InstructorCreateSchema = z.object({
  profileImage: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Image is required",
    }),
  profileImagePreview: z.string().optional(),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),

  email: z.email("Invalid email address").min(1, "Email is required"),

  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number format")
    .optional()
    .or(z.literal("")),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),

  bio: z
    .string()
    .max(2000, "Bio must be less than 2000 characters")
    .optional()
    .or(z.literal("")),

  expertise: z.array(z.string()).optional().default([]),

  socialLinks: z
    .object({
      linkedin: z
        .string()
        .url("Invalid LinkedIn URL")
        .optional()
        .or(z.literal("")),
      twitter: z
        .string()
        .url("Invalid Twitter URL")
        .optional()
        .or(z.literal("")),
      github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
      website: z
        .string()
        .url("Invalid website URL")
        .optional()
        .or(z.literal("")),
    })
    .optional()
    .default({}),

  certifications: z
    .array(
      z.object({
        title: z.string().min(1, "Certification title is required"),
        provider: z.string().optional().or(z.literal("")),
        year: z
          .number()
          .min(1900, "Year must be after 1900")
          .max(new Date().getFullYear(), "Year cannot be in the future")
          .optional(),
        certificateLink: z
          .url("Invalid certificate link URL")
          .optional()
          .or(z.literal("")),
      })
    )
    .optional()
    .default([]),

  achievements: z
    .array(
      z.object({
        title: z.string().min(1, "Achievement title is required"),
        description: z.string().optional().or(z.literal("")),
        date: z.date().optional(),
      })
    )
    .optional()
    .default([]),

  isActive: z.boolean().default(true),
});
