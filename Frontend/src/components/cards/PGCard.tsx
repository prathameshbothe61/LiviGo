import { Building2, Users, BedDouble, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PGCardProps {
  id: string;
  name: string;
  address: string;
  totalRooms: number;
  occupiedBeds: number;
  totalBeds: number;
  rentCollected: number;
  rentPending: number;
}

export function PGCard({
  id,
  name,
  address,
  totalRooms,
  occupiedBeds,
  totalBeds,
  rentCollected,
  rentPending,
}: PGCardProps) {
  const occupancyPercent = Math.round((occupiedBeds / totalBeds) * 100);

  return (
    <Link to={`/pgs/${id}`}>
      <div className="stat-card hover:shadow-lg cursor-pointer animate-slide-up">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <p className="text-lg font-bold text-foreground">{totalRooms}</p>
            <p className="text-xs text-muted-foreground">Rooms</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <p className="text-lg font-bold text-foreground">
              {occupiedBeds}/{totalBeds}
            </p>
            <p className="text-xs text-muted-foreground">Beds</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <p className="text-lg font-bold text-foreground">{occupancyPercent}%</p>
            <p className="text-xs text-muted-foreground">Occupancy</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-1 text-success">
            <IndianRupee className="w-4 h-4" />
            <span className="font-semibold">₹{rentCollected.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground ml-1">collected</span>
          </div>
          <div className="flex items-center gap-1 text-pending">
            <span className="font-semibold">₹{rentPending.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">pending</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
