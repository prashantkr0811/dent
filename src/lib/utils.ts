// src/lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for combining classNames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Avatar generator with fallback support
export function generateAvatar(name: string, gender: "MALE" | "FEMALE" | "OTHER" = "OTHER") {
  if (!name?.trim()) {
    return "https://avatar.iran.liara.run/public";
  }

  const username = name.trim().replace(/\s+/g, "").toLowerCase();
  const base = "https://avatar.iran.liara.run/public";

  if (gender === "FEMALE") return `${base}/girl?username=${username}`;
  if (gender === "MALE") return `${base}/boy?username=${username}`;
  
  // Default neutral avatar
  return `${base}?username=${username}`;
}

// Phone number formatting (US style)
export const formatPhoneNumber = (value: string): string => {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "").slice(0, 10);

  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  }

  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};

// APPOINTMENT TYPES — yehi wajah thi build error ki! Ab perfect hai
export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "Regular Checkup", duration: "60 min", price: "$120" },
  { id: "cleaning", name: "Teeth Cleaning", duration: "45 min", price: "$90" },
  { id: "consultation", name: "Consultation", duration: "30 min", price: "$75" },
  { id: "emergency", name: "Emergency Visit", duration: "30 min", price: "$150" },
] as const;

// Bonus: Helpful date/time utilities (already used in your project)
export const getNext5Days = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  today.setDate(today.getDate() + 1); // start from tomorrow

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

export const getAvailableTimeSlots = (): string[] => [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];