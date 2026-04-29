import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number) {
  const hasDecimal = Math.abs(value % 1) > 0;
  return hasDecimal ? value.toFixed(2) : String(Math.round(value));
}
