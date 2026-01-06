/**
 * Application constants
 */

export const STATES = [
  "Maharashtra",
  "Karnataka",
  "Gujarat",
  "Delhi",
  "Tamil Nadu",
  "Rajasthan",
] as const;

export const CITIES: Record<string, readonly string[]> = {
  Maharashtra: ["Pune", "Mumbai", "Nagpur", "Nashik"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Delhi: ["New Delhi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
} as const;

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const STAY_OPTIONS = ["Boys", "Girls", "Co-living"] as const;

export const IDEAL_FOR_OPTIONS = ["Student", "Working Professional"] as const;

export const OCCUPANCY_OPTIONS = ["Single", "Double", "Triple"] as const;

export const AGREEMENT_DURATIONS = [1, 2, 3, 6, 9, 11, 12] as const;

export const SECURITY_DEPOSIT_MONTHS = [1, 2, 3, 4, 5, 6] as const;

export const NOTICE_PERIOD_DAYS = [0, 7, 15, 30, 45, 60, 90] as const;

export const DUMMY_OTP = "123456";

