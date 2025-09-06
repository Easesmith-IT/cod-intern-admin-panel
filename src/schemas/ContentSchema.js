import { z } from "zod";

// Home page
export const HomeHeroSectionSchema = z.object({
  image1: z.any(),
  // .refine((files) => files instanceof FileList && files.length > 0, {
  //   message: "Image is required",
  // })
  image2: z.any(),
  // .refine((files) => files instanceof FileList && files.length > 0, {
  //   message: "Image is required",
  // })
  image3: z.any(),
  // .refine((files) => files instanceof FileList && files.length > 0, {
  //   message: "Image is required",
  // })
  image1Preview: z.string().optional(),
  image2Preview: z.string().optional(),
  image3Preview: z.string().optional(),
  banner1: z.object({
    card1: z.object({
      title: z.string().min(1, "Title required"),
      desc: z.string().min(1, "Description required"),
      button: z.object({
        text: z.string().min(1, "Button text required"),
        link: z.string().min(1, "Button link required"),
      }),
    }),
    card2: z.object({
      title: z.string().min(1, "Title required"),
      desc: z.string().min(1, "Description required"),
      button: z.object({
        text: z.string().min(1, "Button text required"),
        link: z.string().min(1, "Button link required"),
      }),
    }),
  }),
  banner2: z.object({
    button1: z.object({
      text: z.string().min(1, "Button text required"),
      link: z.string().min(1, "Button link required"),
    }),
    button2: z.object({
      text: z.string().min(1, "Button text required"),
      link: z.string().min(1, "Button link required"),
    }),
  }),
  banner3: z.object({
    button1: z.object({
      text: z.string().min(1, "Button text required"),
      link: z.string().min(1, "Button link required"),
    }),
    button2: z.object({
      text: z.string().min(1, "Button text required"),
      link: z.string().min(1, "Button link required"),
    }),
  }),
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

export const SharpenYourSkillSchema = z.object({
  image: z
    .any(),
    // .refine((files) => files instanceof FileList && files.length > 0, {
    //   message: "Image is required",
    // }),
  imagePreview: z.string().optional(),
  desc: z.string().min(1, "Required"),
});

export const UniversitiesSchema = z.object({
  icons: z
    .array(
      z.object({
        image: z.any().optional(), // File input
        preview: z.string().optional(),
      })
    )
    .min(1, "At least one icon is required"),
});

export const WhyCodInternsSchema = z.object({
  desc: z.string().min(1, "Required"),
});

export const LearningToCareerSchema = z.object({
  desc: z.string().min(1, "Required"),
  steps: z.array(
    z.object({
      index: z.number(),
      title: z.string().min(1, "Title is required"),
      title1: z.string().optional(),
      description: z.string().optional(),
      points: z.array(z.string()).optional(), // for list items
    })
  ),
});

export const ConnectWithUsSchema = z.object({
  image: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Image is required",
    }),
  imagePreview: z.string().optional(),
  desc: z.string().min(1, "Required"),
});

export const WeJustKeepGrowingSchema = z.object({
  image: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Image is required",
    }),
  imagePreview: z.string().optional(),
  desc: z.string().min(1, "Required"),
});

export const MentorsSchema = z.object({
  mentors: z
    .array(
      z.object({
        image: z.any(),
        imagePreview: z.string().optional(),
        name: z.string().min(1, "Name required"),
        position: z.string().min(1, "Position required"),
        arr: z.array(z.string().min(1, "Item required")),
      })
    )
    .length(3, "Exactly 3 steps are required"),
});

// About us page

export const HeroSectionSchema = z.object({
  desc: z.string().min(1, "Required"),
});
export const AchieveYourGoalsSchema = z.object({
  desc: z.string().min(1, "Required"),
  items: z
    .array(
      z.object({
        text: z.string().min(3, "Enter at least 3 characters"),
      })
    )
    .min(1, "At least one item is required"),
});

export const ShapingFuturesSchema = z.object({
  subheading: z.string().min(1, "Subheading required"),
  paragraph: z.string().min(1, "Paragraph required"),
  infos: z
    .array(
      z.object({
        image: z.any(),
        imagePreview: z.string().optional(),
        title: z.string().min(1, "Title required"),
        desc: z.string().min(1, "Description required"),
      })
    )
    .length(3, "Exactly 3 steps are required"),
});

export const StartYourCourseSchema = z.object({
  stats: z.array(
    z.object({
      icon: z.any(), // File input
      iconPreview: z.string().optional(),
      number: z.string().min(1, "Number is required"),
      label: z.string().min(1, "Label is required"),
    })
  ),
});

export const ExpertInstructorLiveClassesSchema = z.object({
  image: z.any(),
  imagePreview: z.string().optional(),
  desc: z.string().min(1, "Required"),
});
