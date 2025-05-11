import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ToastActionElement, toast, ToastProps } from "@/hooks/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FeedbackToastProps = {
  title: string;
  description?: string;
  variant?: ToastProps["variant"];
  action?: ToastActionElement;
};

export const feedbackToast = (
  toastFn: typeof toast,
  { title, description, variant = "default", action }: FeedbackToastProps
) => {
  return toastFn({
    title,
    description,
    variant,
    action,
  });
};

export const formatTimeRemaining = (expiryTimestamp: number): string => {
  const now = new Date().getTime();
  const diff = expiryTimestamp - now;
  
  if (diff <= 0) return "00:00:00";
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const difficultyColorMap: Record<string, { bg: string; text: string }> = {
  easy: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
  medium: { bg: "bg-amber-500/10", text: "text-amber-500" },
  hard: { bg: "bg-rose-500/10", text: "text-rose-500" }
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
