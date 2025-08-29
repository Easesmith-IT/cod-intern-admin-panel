import { z } from "zod";

export const FaqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  category: z.enum(["General", "Courses"], {
    required_error: "Category is required",
  }),
  courseId: z.string().optional(),
  order: z.number().min(0, "Order must be 0 or greater").optional(),
  isActive: z.boolean().default(true),
}).refine(
  (data) => {
    // If category is "Courses", courseId must be provided
    if (data.category === "Courses" && !data.courseId) {
      return false;
    }
    return true;
  },
  {
    message: "Course ID is required when category is 'Courses'",
    path: ["courseId"],
  }
);

export const EditFaqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  category: z.enum(["General", "Courses"], {
    required_error: "Category is required",
  }),
  courseId: z.string().optional(),
  order: z.number().min(0, "Order must be 0 or greater").optional(),
  isActive: z.boolean().default(true),
}).refine(
  (data) => {
    // If category is "Courses", courseId must be provided
    if (data.category === "Courses" && !data.courseId) {
      return false;
    }
    return true;
  },
  {
    message: "Course ID is required when category is 'Courses'",
    path: ["courseId"],
  }
);
