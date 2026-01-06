import { Users, Zap, BedDouble } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  id: string;
  pgId: string;
  roomNumber: string;
  totalBeds: number;
  occupiedBeds: number;
  rentStatus: "paid" | "partial" | "pending";
  electricityPaid: boolean;
}

export function RoomCard({
  id,
  pgId,
  roomNumber,
  totalBeds,
  occupiedBeds,
  rentStatus,
  electricityPaid,
}: RoomCardProps) {
  const statusStyles = {
    paid: "room-card-paid",
    partial: "border-warning/40 bg-warning/5",
    pending: "room-card-pending",
  };

  return (
    <Link to={`/pgs/${pgId}/rooms/${id}`}>
      <div className={cn("room-card animate-scale-in", statusStyles[rentStatus])}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-foreground">{roomNumber}</span>
          {rentStatus === "paid" ? (
            <span className="status-badge status-paid">Paid</span>
          ) : rentStatus === "partial" ? (
            <span className="status-badge status-warning">Partial</span>
          ) : (
            <span className="status-badge status-pending">Pending</span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <BedDouble className="w-4 h-4" />
            <span>
              {occupiedBeds}/{totalBeds}
            </span>
          </div>
          <div
            className={cn(
              "flex items-center gap-1",
              electricityPaid ? "text-success" : "text-pending"
            )}
          >
            <Zap className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
