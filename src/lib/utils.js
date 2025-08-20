import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function previewImage(
  image,
  placeholder = "/user-placeholder.png"
) {
  return image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}` : placeholder;
}

export function getStatusColorCode(status) {
  switch (status) {
    case "pending":
      return "text-yellow-500 bg-yellow-100"; // waiting
    case "reviewed":
      return "text-blue-500 bg-blue-100"; // reviewed by recruiter
    case "shortlisted":
      return "text-purple-500 bg-purple-100"; // moved forward
    case "rejected":
      return "text-red-500 bg-red-100"; // application declined
    case "accepted":
      return "text-green-500 bg-green-100"; // offer accepted
    default:
      return "text-gray-500 bg-gray-100"; // fallback
  }
}

