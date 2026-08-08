import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price?: number): string {
  if (price === undefined || price === null || Number.isNaN(price)) return "Price on request";

  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `Rs. ${(price / 100000).toFixed(2)} L`;
  }
  return `Rs. ${price.toLocaleString("en-IN")}`;
}

export function formatPriceRange(min?: number, max?: number): string {
  if ((min === undefined || min === null) && (max === undefined || max === null)) return "Price on request";
  if (min === undefined || min === null) return formatPrice(max);
  if (max === undefined || max === null) return formatPrice(min);
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

export function getStatusColor(status: string) {
  switch (status) {
    case "ready-to-move":
      return "success";
    case "under-construction":
      return "warning";
    case "new-launch":
      return "primary";
    default:
      return "outline";
  }
}
