import { z } from "zod";

export const AddSubAdminSchema = z.object({
  position: z.string().min(1, "Position is required"),
  profileImage: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Job image is required",
    }),
  jobImagePreview: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  name: z.string().min(1, "Name is required"),
  status: z.string().optional(),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must contain only digits"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  permissions: z.object({
    dashboard: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for dashboard.",
    }),
    admins: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for admin.",
    }),
    job: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for job.",
    }),
    student: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for student.",
    }),
    review: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for review.",
    }),
  }),
});

export const EditSubAdminSchema = z.object({
  position: z.string().min(1, "Position is required"),
  name: z.string().min(1, "Name is required"),
  cityName: z.string().min(1, "CityName is required"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must contain only digits"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  permissions: z.object({
    dashboard: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for dashboard.",
    }),
    subAdmin: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for subAdmin.",
    }),
    customer: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for customer.",
    }),
    restaurant: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for restaurant.",
    }),
    vendor: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for vendor.",
    }),
    deliveryAgent: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for deliveryAgent.",
    }),
    order: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for order.",
    }),
    review: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for review.",
    }),
    offer: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for offer.",
    }),
    applicationRequest: z.enum(["none", "read", "read&write"], {
      required_error: "Please select an access level for applicationRequest.",
    }),
  }),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Current password must be at least 8 characters long."),
  changePassword: z
    .string()
    .min(8, "New password must be at least 8 characters long.")
    .regex(/[A-Z]/, "New password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "New password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "New password must contain at least one number.")
    .regex(
      /[@$!%*?&]/,
      "New password must contain at least one special character."
    ),
});
