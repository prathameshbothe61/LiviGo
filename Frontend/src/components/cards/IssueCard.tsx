import { Wifi, Wrench, Droplets, Zap, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type IssueType = "wifi" | "plumbing" | "cleaning" | "electricity" | "other";
type IssueStatus = "open" | "in_progress" | "resolved";

interface IssueCardProps {
  roomNumber: string;
  type: IssueType;
  description: string;
  status: IssueStatus;
  dateRaised: string;
  onStatusChange?: (status: IssueStatus) => void;
}

const issueIcons: Record<IssueType, typeof Wifi> = {
  wifi: Wifi,
  plumbing: Droplets,
  cleaning: Wrench,
  electricity: Zap,
  other: Wrench,
};

const statusColors: Record<IssueStatus, string> = {
  open: "border-l-pending",
  in_progress: "border-l-warning",
  resolved: "border-l-success",
};

const statusBadge: Record<IssueStatus, string> = {
  open: "status-pending",
  in_progress: "status-warning",
  resolved: "status-paid",
};

export function IssueCard({
  roomNumber,
  type,
  description,
  status,
  dateRaised,
  onStatusChange,
}: IssueCardProps) {
  const Icon = issueIcons[type];

  return (
    <div className={cn("issue-card animate-slide-up", statusColors[status])}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <Icon className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground capitalize">{type} Issue</h4>
            <p className="text-sm text-muted-foreground">Room {roomNumber}</p>
          </div>
        </div>
        <span className={cn("status-badge", statusBadge[status])}>
          {status === "open" ? "Open" : status === "in_progress" ? "In Progress" : "Resolved"}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-3">{description}</p>

      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {dateRaised}
        </span>
        {status !== "resolved" && onStatusChange && (
          <div className="flex gap-2">
            {status === "open" && (
              <Button
                variant="warning"
                size="sm"
                onClick={() => onStatusChange("in_progress")}
              >
                Start
              </Button>
            )}
            <Button
              variant="success"
              size="sm"
              onClick={() => onStatusChange("resolved")}
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Resolve
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
