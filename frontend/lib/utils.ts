import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLastPathSegment(pathname: string) {
  const segments = pathname.split('/');
  const lastSegment = segments.pop() || '';
  return decodeURIComponent(lastSegment);
}