import { useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Users, BedDouble, IndianRupee } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageHeader } from "@/components/layout/PageHeader";
import { RoomCard } from "@/components/cards/RoomCard";
import { IssueCard } from "@/components/cards/IssueCard";
import { WashingMachineCard } from "@/components/cards/WashingMachineCard";
import { cn } from "@/lib/utils";

const tabs = ["Rooms", "Rent", "Electricity", "Issues", "Utilities"];

const mockRooms = [
  { id: "1", roomNumber: "101", totalBeds: 3, occupiedBeds: 3, rentStatus: "paid" as const, electricityPaid: true },
  { id: "2", roomNumber: "102", totalBeds: 3, occupiedBeds: 2, rentStatus: "pending" as const, electricityPaid: false },
  { id: "3", roomNumber: "103", totalBeds: 2, occupiedBeds: 2, rentStatus: "paid" as const, electricityPaid: true },
  { id: "4", roomNumber: "104", totalBeds: 3, occupiedBeds: 3, rentStatus: "partial" as const, electricityPaid: true },
  { id: "5", roomNumber: "105", totalBeds: 2, occupiedBeds: 1, rentStatus: "pending" as const, electricityPaid: false },
  { id: "6", roomNumber: "106", totalBeds: 3, occupiedBeds: 2, rentStatus: "paid" as const, electricityPaid: true },
  { id: "7", roomNumber: "201", totalBeds: 3, occupiedBeds: 3, rentStatus: "paid" as const, electricityPaid: true },
  { id: "8", roomNumber: "202", totalBeds: 2, occupiedBeds: 2, rentStatus: "pending" as const, electricityPaid: false },
];

const mockIssues = [
  { roomNumber: "102", type: "wifi" as const, description: "WiFi not working since yesterday", status: "open" as const, dateRaised: "2 hours ago" },
  { roomNumber: "105", type: "plumbing" as const, description: "Bathroom tap leaking", status: "in_progress" as const, dateRaised: "1 day ago" },
  { roomNumber: "201", type: "electricity" as const, description: "AC not cooling properly", status: "open" as const, dateRaised: "3 hours ago" },
];

const mockMachines = [
  { machineNumber: 1, status: "available" as const },
  { machineNumber: 2, status: "in_use" as const, usedBy: "Rahul", roomNumber: "102", timeSinceStart: "25 mins" },
];

export default function PGDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Rooms");

  const pgData = {
    name: "Sunrise PG",
    address: "123 Koregaon Park, Pune",
    totalRooms: 12,
    occupiedBeds: 28,
    totalBeds: 36,
    vacantBeds: 8,
  };

  return (
    <div className="page-container">
      <PageHeader title={pgData.name} showBack />

      {/* PG Summary */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span>{pgData.address}</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-3 rounded-xl bg-card shadow-sm border border-border/50">
            <p className="text-lg font-bold text-foreground">{pgData.totalRooms}</p>
            <p className="text-xs text-muted-foreground">Rooms</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-card shadow-sm border border-border/50">
            <p className="text-lg font-bold text-foreground">{pgData.occupiedBeds}</p>
            <p className="text-xs text-muted-foreground">Tenants</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-success/10 border border-success/20">
            <p className="text-lg font-bold text-success">{pgData.totalBeds}</p>
            <p className="text-xs text-muted-foreground">Total Beds</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-warning/10 border border-warning/20">
            <p className="text-lg font-bold text-warning">{pgData.vacantBeds}</p>
            <p className="text-xs text-muted-foreground">Vacant</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pb-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn("tab-item", activeTab === tab ? "tab-active" : "tab-inactive")}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="content-container">
        {activeTab === "Rooms" && (
          <div className="grid grid-cols-2 gap-3">
            {mockRooms.map((room) => (
              <RoomCard key={room.id} pgId={id || "1"} {...room} />
            ))}
          </div>
        )}

        {activeTab === "Issues" && (
          <div className="space-y-3">
            {mockIssues.map((issue, index) => (
              <IssueCard key={index} {...issue} />
            ))}
          </div>
        )}

        {activeTab === "Utilities" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Washing Machines</h3>
            <div className="grid grid-cols-2 gap-3">
              {mockMachines.map((machine) => (
                <WashingMachineCard key={machine.machineNumber} {...machine} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "Rent" && (
          <div className="text-center py-12 text-muted-foreground">
            <IndianRupee className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>View rent details for this PG</p>
          </div>
        )}

        {activeTab === "Electricity" && (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Manage electricity bills</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
