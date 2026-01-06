import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BedDouble, Zap, Users, UserPlus, Calendar } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageHeader } from "@/components/layout/PageHeader";
import { TenantCard } from "@/components/cards/TenantCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const mockTenants = [
  { 
    name: "Rahul Sharma", 
    rentAmount: 8000, 
    rentStatus: "paid" as const, 
    electricityShare: 150,
    expectedMoveOut: "Jan 25, 2025"
  },
  { 
    name: "Amit Kumar", 
    rentAmount: 8000, 
    rentStatus: "pending" as const, 
    electricityShare: 150,
    expectedMoveOut: null
  },
  { 
    name: "Vijay Singh", 
    rentAmount: 8000, 
    rentStatus: "pending" as const, 
    electricityShare: 150,
    expectedMoveOut: "Mar 15, 2025"
  },
];

export default function RoomDetails() {
  const { pgId, roomId } = useParams();
  const navigate = useNavigate();

  const roomData = {
    roomNumber: "102",
    totalBeds: 3,
    occupiedBeds: 3,
    totalRent: 24000,
    collectedRent: 8000,
    totalElectricity: 450,
    electricityPaid: false,
  };

  const handleMarkPaid = (name: string) => {
    toast({
      title: "Rent Marked as Paid",
      description: `${name}'s rent has been marked as paid.`,
    });
  };

  const upcomingVacancies = mockTenants.filter(t => t.expectedMoveOut);

  return (
    <div className="page-container">
      <PageHeader 
        title={`Room ${roomData.roomNumber}`} 
        showBack
        rightAction={
          <Button variant="gradient" size="sm" onClick={() => navigate("/add-tenant")}>
            <UserPlus className="w-4 h-4 mr-1" />
            Add
          </Button>
        }
      />

      {/* Room Summary */}
      <div className="px-4 pb-4">
        <div className="stat-card">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <BedDouble className="w-5 h-5 text-primary" />
              </div>
              <p className="text-lg font-bold text-foreground">
                {roomData.occupiedBeds}/{roomData.totalBeds}
              </p>
              <p className="text-xs text-muted-foreground">Beds</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-success" />
              </div>
              <p className="text-lg font-bold text-foreground">
                ₹{roomData.collectedRent.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Collected</p>
            </div>
            <div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                roomData.electricityPaid ? "bg-success/10" : "bg-pending/10"
              }`}>
                <Zap className={`w-5 h-5 ${roomData.electricityPaid ? "text-success" : "text-pending"}`} />
              </div>
              <p className="text-lg font-bold text-foreground">₹{roomData.totalElectricity}</p>
              <p className="text-xs text-muted-foreground">Electricity</p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container">
        {/* Upcoming Vacancies Notice */}
        {upcomingVacancies.length > 0 && (
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold text-foreground">Upcoming Vacancies</h4>
            </div>
            <div className="space-y-2">
              {upcomingVacancies.map((tenant, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{tenant.name}</span>
                  <span className="text-blue-500 font-medium">Leaving: {tenant.expectedMoveOut}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Tenants ({roomData.occupiedBeds})</h3>
          <Button variant="success" size="sm">
            Mark All Paid
          </Button>
        </div>

        <div className="space-y-3">
          {mockTenants.map((tenant, index) => (
            <div key={index} className="relative">
              <TenantCard
                {...tenant}
                onMarkPaid={() => handleMarkPaid(tenant.name)}
              />
              {tenant.expectedMoveOut && (
                <div className="absolute top-2 right-2">
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">
                    Leaving: {tenant.expectedMoveOut}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
