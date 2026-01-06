import { useState } from "react";
import { Zap, IndianRupee, Calculator, Users, Check, Building2 } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const mockPGs = [
  { id: "1", name: "Sunrise PG" },
  { id: "2", name: "Green Valley PG" },
];

// Room-wise data with owner contribution per room
const mockRoomBillsByPG: Record<string, Array<{
  room: string;
  tenants: number;
  totalBill: number;
  ownerContribution: number;
  status: string;
}>> = {
  "1": [
    { room: "101", tenants: 3, totalBill: 1500, ownerContribution: 500, status: "paid" },
    { room: "102", tenants: 2, totalBill: 1200, ownerContribution: 500, status: "pending" },
    { room: "103", tenants: 2, totalBill: 1000, ownerContribution: 500, status: "paid" },
    { room: "104", tenants: 3, totalBill: 1800, ownerContribution: 500, status: "pending" },
    { room: "105", tenants: 1, totalBill: 800, ownerContribution: 500, status: "pending" },
    { room: "106", tenants: 2, totalBill: 1100, ownerContribution: 500, status: "paid" },
  ],
  "2": [
    { room: "201", tenants: 2, totalBill: 1300, ownerContribution: 500, status: "paid" },
    { room: "202", tenants: 3, totalBill: 1600, ownerContribution: 500, status: "pending" },
    { room: "203", tenants: 2, totalBill: 1400, ownerContribution: 500, status: "paid" },
    { room: "204", tenants: 1, totalBill: 900, ownerContribution: 500, status: "pending" },
  ],
};

export default function ElectricityManagement() {
  const [selectedPG, setSelectedPG] = useState("1");
  const [ownerContribution, setOwnerContribution] = useState("500");

  const roomBills = mockRoomBillsByPG[selectedPG] || [];
  
  // Calculate per room: remaining after owner contribution split among tenants
  const getRoomSplit = (room: typeof roomBills[0]) => {
    const remaining = Math.max(0, room.totalBill - parseInt(ownerContribution || "0"));
    const perTenant = room.tenants > 0 ? Math.ceil(remaining / room.tenants) : 0;
    return { remaining, perTenant };
  };

  const totalBillAmount = roomBills.reduce((sum, r) => sum + r.totalBill, 0);
  const totalOwnerContribution = roomBills.length * parseInt(ownerContribution || "0");
  const totalTenantShare = roomBills.reduce((sum, r) => sum + getRoomSplit(r).remaining, 0);

  return (
    <div className="page-container">
      <PageHeader title="Electricity Bill" showBack />

      <div className="content-container">
        {/* PG Selector */}
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-muted-foreground" />
          <Select value={selectedPG} onValueChange={setSelectedPG}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select PG" />
            </SelectTrigger>
            <SelectContent>
              {mockPGs.map((pg) => (
                <SelectItem key={pg.id} value={pg.id}>
                  {pg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Owner Contribution Per Room */}
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Owner Contribution</h3>
              <p className="text-sm text-muted-foreground">Amount you pay per room</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Share (Per Room)</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                value={ownerContribution}
                onChange={(e) => setOwnerContribution(e.target.value)}
                className="pl-9"
                inputSize="lg"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Remaining amount will be split among tenants in each room
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-4 rounded-xl bg-card shadow-sm border border-border/50">
            <p className="text-xl font-bold text-foreground">₹{totalBillAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Bill</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xl font-bold text-primary">₹{totalOwnerContribution.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Your Share</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-warning/10 border border-warning/20">
            <p className="text-xl font-bold text-warning">₹{totalTenantShare.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Tenant Share</p>
          </div>
        </div>

        {/* Room-wise Status */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Room-wise Split</h3>
          
          {roomBills.map((room) => {
            const { remaining, perTenant } = getRoomSplit(room);
            
            return (
              <div key={room.room} className="tenant-card animate-slide-up">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <span className="font-bold text-foreground">{room.room}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{room.tenants} tenants</span>
                        <span>•</span>
                        <span>Bill: ₹{room.totalBill}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                          Owner: ₹{ownerContribution}
                        </span>
                        <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded">
                          ₹{perTenant}/person
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={cn(
                      "status-badge",
                      room.status === "paid" ? "status-paid" : "status-pending"
                    )}>
                      {room.status === "paid" && <Check className="w-3 h-3 mr-1" />}
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </span>
                    {room.status !== "paid" && (
                      <Button variant="success" size="sm">
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
