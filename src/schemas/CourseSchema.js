import { z } from "zod";

export const step1Schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  overview: z.string().min(1, "Overview is required"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  language: z.string().default("English"),
  introVideo: z.url().optional().or(z.literal("")),
  isFastTrack: z.boolean().default(false),
});

export const step2Schema = z.object({
  pricing: z.object({
    price: z.number().min(0),
    discountPrice: z.number().min(0).optional(),
    currency: z.string().default("INR"),
    isFree: z.boolean().default(false),
  }),
  certificate: z.object({
    title: z.string().min(1, "Certificate title is required"),
    provider: z.string().optional(),
    issueDate: z.coerce.date().optional().nullable(),
    expiryDate: z.coerce.date().optional().nullable(),
  }),

  courseHighlights: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        type: z.enum(["feature", "highlight", "certification", "update"]),
        value: z.string().optional(),
      })
    )
    .min(1, "At least one course highlight is required"),
  studentBenefits: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        type: z.enum(["feature", "highlight", "certification", "update"]),
        value: z.string().optional(),
      })
    )
    .min(1, "At least one student benefit is required"),
});

const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  contentType: z.enum(["video", "article", "quiz", "assignment"]),
  contentUrl: z.url(),
  duration: z.number().min(1).optional(),
  isPreviewFree: z.boolean().default(false),
});

const moduleSchema = z.object({
  title: z.string().min(1, "Module title is required"),
  description: z.string().min(1, "Module description is required"),
  lessons: z.array(lessonSchema).min(1, "At least one lesson is required"),
});

export const step3Schema = z.object({
  modules: z.array(moduleSchema).min(1, "At least one module is required"),
});

const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  tools: z.array(z.string()).optional(),
});

const batchSchema = z.object({
  name: z.string().min(1, "Batch name is required"),
  startDate: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Invalid start date",
  }),
  endDate: z.coerce.date().optional().nullable(),
  schedule: z.object({
    days: z.array(z.string()).min(1, "At least one day is required"),
    time: z.object({
      start: z.string().min(1, "Start time is required"),
      end: z.string().min(1, "End time is required"),
    }),
  }),
  seatsLimit: z.number().min(1, "Seats limit is required"),
  price: z.number().min(0, "Price is required"),
  offerPrice: z.number().min(0).optional(),
  status: z.enum(["upcoming", "ongoing", "completed"]).default("upcoming"),
  batchHighlights: z.array(z.string()).optional(),
});

export const step4Schema = z.object({
  projects: z.array(projectSchema).optional(),
  batches: z.array(batchSchema).optional(),
});

export const step5Schema = z.object({
  courseDuration: z.string().min(1, "Course duration is required"),
  classTiming: z.string().min(1, "Class timing is required"),
  totalSeats: z.number().min(1, "Total seats is required"),
  interviews: z
    .union([
      z.coerce.number().int().min(0), // coerces string → number
      z.literal("unlimited"),
      z.literal("No guarantee"),
    ])
    .optional(),
  integratedInternship: z.object({
    hasInternship: z.boolean().default(false),
    count: z
      .union([z.coerce.number().optional(), z.literal("unlimited")])
      .optional(),
  }),
  features: z
    .array(
      z.object({
        title: z.string().min(1, "Feature title is required"),
        subtitle: z.string().optional(),
      })
    )
    .min(1, "At least one feature is required"),
  venue: z.enum(["online"]).default("online"),
  onlinePlatform: z.string().optional(),
  meetingLink: z.url().optional().or(z.literal("")),
  //   brochureFile: z
  //     .any()
  //     .refine((files) => files instanceof FileList && files.length > 0, {
  //       message: "Brochure pdf is required",
  //     }),
  //   syllabusFile: z
  //     .any()
  //     .refine((files) => files instanceof FileList && files.length > 0, {
  //       message: "Syllabus pdf is required",
  //     }),
  averageRating: z.string().default("4.5"),
});

export const step6Schema = z.object({
  instructors: z
    .array(z.string())
    .min(1, "At least one instructor is required"),
  status: z.enum(["draft", "published", "archived"]),
});
