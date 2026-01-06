/**
 * Shared TypeScript type definitions for LiviGo
 */

export type UserType = "owner" | "tenant";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
}

export type IssueType = "wifi" | "plumbing" | "electricity" | "cleaning" | "other";
export type IssueStatus = "open" | "in_progress" | "resolved";

export interface Issue {
  id: number;
  roomNumber: string;
  type: IssueType;
  description: string;
  status: IssueStatus;
  dateRaised: string;
}

export type RentStatus = "paid" | "partial" | "pending";

export interface Room {
  id: string;
  pgId: string;
  roomNumber: string;
  totalBeds: number;
  occupiedBeds: number;
  rentStatus: RentStatus;
  electricityPaid: boolean;
}

export interface PG {
  id: string;
  name: string;
  address: string;
  totalRooms: number;
  occupiedBeds: number;
  totalBeds: number;
  rentCollected: number;
  rentPending: number;
}

export interface Tenant {
  id: number;
  name: string;
  room: string;
  amount: number;
  status: "paid" | "pending";
  date: string | null;
  mode: string | null;
}

export type AnnouncementType = "info" | "warning" | "urgent";

export interface Announcement {
  title: string;
  message: string;
  date: string;
  type: AnnouncementType;
}

