import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(imageId: string): string {
  if (imageId.startsWith("http")) {
    return imageId;
  }

  if (!imageId.includes("/")) {
    return `/api/convex-image/${imageId}`;
  }

  return imageId;
}
