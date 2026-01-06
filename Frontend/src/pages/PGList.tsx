import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageHeader } from "@/components/layout/PageHeader";
import { PGCard } from "@/components/cards/PGCard";
import { Button } from "@/components/ui/button";

const mockPGs = [
  {
    id: "1",
    name: "Sunrise PG",
    address: "Koregaon Park, Pune",
    totalRooms: 12,
    occupiedBeds: 28,
    totalBeds: 36,
    rentCollected: 168000,
    rentPending: 32000,
  },
  {
    id: "2",
    name: "Green Valley PG",
    address: "Viman Nagar, Pune",
    totalRooms: 12,
    occupiedBeds: 17,
    totalBeds: 24,
    rentCollected: 117000,
    rentPending: 32000,
  },
];

export default function PGList() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <PageHeader
        title="My PGs"
        rightAction={
          <Button variant="gradient" size="sm" onClick={() => navigate("/add-pg")}>
            <Plus className="w-4 h-4 mr-1" />
            Add PG
          </Button>
        }
      />

      <div className="content-container">
        <div className="space-y-4">
          {mockPGs.map((pg) => (
            <PGCard key={pg.id} {...pg} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
