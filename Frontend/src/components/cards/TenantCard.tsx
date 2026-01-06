import { User, IndianRupee, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TenantCardProps {
  name: string;
  rentAmount: number;
  rentStatus: "paid" | "pending" | "partial";
  electricityShare: number;
  onMarkPaid?: () => void;
}

export function TenantCard({
  name,
  rentAmount,
  rentStatus,
  electricityShare,
  onMarkPaid,
}: TenantCardProps) {
  return (
    <div className="tenant-card animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{name}</h4>
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5" />
                {rentAmount.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />₹{electricityShare}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {rentStatus === "paid" ? (
            <span className="status-badge status-paid">
              <Check className="w-3 h-3 mr-1" />
              Paid
            </span>
          ) : rentStatus === "partial" ? (
            <span className="status-badge status-warning">Partial</span>
          ) : (
            <span className="status-badge status-pending">Pending</span>
          )}
          {rentStatus !== "paid" && onMarkPaid && (
            <Button variant="success" size="sm" onClick={onMarkPaid}>
              Mark Paid
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
