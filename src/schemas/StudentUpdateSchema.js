import { z } from "zod";

// Schema for admin-editable student fields only
export const StudentUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  
  emailId: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() === "" || /^\+?[\d\s\-()]{8,15}$/.test(val), {
      message: "Invalid phone number format",
    }),
  
  alternatePhone: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() === "" || /^\+?[\d\s\-()]{8,15}$/.test(val), {
      message: "Invalid alternate phone number format",
    }),
  
  bio: z
    .string()
    .max(500, "Bio is too long (max 500 characters)")
    .optional(),
  
  contactMethod: z
    .string()
    .optional(),
  
  profileVisibility: z.boolean().optional(),
});
