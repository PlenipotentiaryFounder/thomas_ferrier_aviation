import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// NOTE: In production, this would parse the CSV data from ForeFlight
export function parseFlightData(csvData: string) {
  // Implementation would go here
  return {
    totalHours: 0,
    picHours: 0,
    totalFlights: 0,
    lastFlight: "",
    // etc.
  }
}
