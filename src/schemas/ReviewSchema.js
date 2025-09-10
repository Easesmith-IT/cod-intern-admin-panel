import { z } from "zod";

export const reviewSchema = z.object({
  platform: z.enum(["LinkedIn", "Google", "Website"]).optional(),
  rating: z.coerce.number().min(0).max(5),
  reviewText: z
    .string()
    .min(10, { message: "Review text must be at least 10 characters long" }),

  reviewerName: z
    .string()
    .min(2, { message: "Reviewer name must be at least 2 characters long" }),

  reviewerRole: z.string().optional(),
  category: z.enum(["General", "Course"]),
  courseId: z.string().optional(), // required if category = Course
  status: z.enum(["active", "inactive"]).optional(),
});
