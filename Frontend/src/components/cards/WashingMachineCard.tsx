import { WashingMachine, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface WashingMachineCardProps {
  machineNumber: number;
  status: "available" | "in_use";
  usedBy?: string;
  roomNumber?: string;
  timeSinceStart?: string;
  onForceRelease?: () => void;
}

export function WashingMachineCard({
  machineNumber,
  status,
  usedBy,
  roomNumber,
  timeSinceStart,
  onForceRelease,
}: WashingMachineCardProps) {
  return (
    <div
      className={cn(
        "stat-card animate-scale-in",
        status === "available"
          ? "border-success/30 bg-success/5"
          : "border-warning/30 bg-warning/5"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              status === "available" ? "bg-success/20" : "bg-warning/20"
            )}
          >
            <WashingMachine
              className={cn(
                "w-6 h-6",
                status === "available" ? "text-success" : "text-warning"
              )}
            />
          </div>
          <div>
            <h4 className="font-bold text-foreground">Machine #{machineNumber}</h4>
            <span
              className={cn(
                "status-badge mt-1",
                status === "available" ? "status-paid" : "status-warning"
              )}
            >
              {status === "available" ? "Available" : "In Use"}
            </span>
          </div>
        </div>
      </div>

      {status === "in_use" && (
        <>
          <div className="space-y-2 mb-3">
            {usedBy && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{usedBy}</span>
                {roomNumber && (
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">
                    Room {roomNumber}
                  </span>
                )}
              </div>
            )}
            {timeSinceStart && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Started {timeSinceStart} ago</span>
              </div>
            )}
          </div>
          {onForceRelease && (
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={onForceRelease}
            >
              Force Release
            </Button>
          )}
        </>
      )}
    </div>
  );
}
