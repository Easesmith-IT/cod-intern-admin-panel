import { z } from "zod";

export const heroSectionBannersSchema = z.object({
  image1: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Image is required",
    }),
  image2: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Image is required",
    }),
  image3: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Image is required",
    }),
  image1Preview: z.string().optional(),
  image2Preview: z.string().optional(),
  image3Preview: z.string().optional(),
});

export const ThreeStepApproachSchema = z.object({
  steps: z
    .array(
      z.object({
        title: z.string().min(1, "Title required"),
        arr: z.array(z.string().min(1, "Item required")),
      })
    )
    .length(3, "Exactly 3 steps are required"), // ✅ fixed to 3
});
export const PopularCoursesSchema = z.object({
  desc: z.string().min(1, "Required"),
});
