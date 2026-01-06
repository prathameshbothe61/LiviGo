import { Megaphone, Calendar, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnnouncementCardProps {
  title: string;
  message: string;
  date: string;
  type: "info" | "warning" | "urgent";
}

const typeStyles = {
  info: "bg-primary/10 text-primary",
  warning: "bg-warning/10 text-warning",
  urgent: "bg-pending/10 text-pending",
};

export function AnnouncementCard({ title, message, date, type }: AnnouncementCardProps) {
  return (
    <div className="stat-card animate-slide-up">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${typeStyles[type]}`}>
            <Megaphone className="w-4 h-4" />
          </div>
          <h4 className="font-semibold text-foreground">{title}</h4>
        </div>
        <Button variant="ghost" size="icon-sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{message}</p>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Calendar className="w-3.5 h-3.5" />
        <span>{date}</span>
      </div>
    </div>
  );
}
