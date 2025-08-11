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
