import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, BedDouble, Calendar, IndianRupee } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const mockPGs = [
  { id: "1", name: "Sunrise PG", rooms: ["101", "102", "103", "104", "105"] },
  { id: "2", name: "Green Valley PG", rooms: ["201", "202", "203", "204"] },
];

export default function AddTenant() {
  const navigate = useNavigate();
  const [selectedPG, setSelectedPG] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    rentAmount: "8000",
    moveInDate: "",
    expectedMoveOutDate: "",
  });

  const selectedPGData = mockPGs.find(pg => pg.id === selectedPG);

  const handleSubmit = () => {
    if (!formData.name || !selectedPG || !selectedRoom) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Tenant Added",
      description: `${formData.name} has been added to Room ${selectedRoom}.`,
    });
    navigate("/dashboard");
  };

  return (
    <div className="page-container">
      <PageHeader title="Add Tenant" showBack />

      <div className="content-container space-y-6 pb-8">
        {/* Select PG */}
        <div className="stat-card space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Select PG & Room</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">Select PG *</label>
              <Select value={selectedPG} onValueChange={setSelectedPG}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose a PG" />
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

            {selectedPG && (
              <div>
                <label className="text-sm font-medium text-foreground">Select Room *</label>
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose a Room" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedPGData?.rooms.map((room) => (
                      <SelectItem key={room} value={room}>
                        Room {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Tenant Details */}
        <div className="stat-card space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <User className="w-5 h-5 text-success" />
            </div>
            <h3 className="font-semibold text-foreground">Tenant Details</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">Full Name *</label>
              <Input
                placeholder="Enter tenant name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                inputSize="lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <Input
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                inputSize="lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="tenant@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                inputSize="lg"
              />
            </div>
          </div>
        </div>

        {/* Rent & Duration */}
        <div className="stat-card space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground">Rent & Duration</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">Monthly Rent (₹)</label>
              <Input
                type="number"
                placeholder="8000"
                value={formData.rentAmount}
                onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                inputSize="lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Move-in Date</label>
              <Input
                type="date"
                value={formData.moveInDate}
                onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                inputSize="lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Expected Move-out Date (Optional)</label>
              <Input
                type="date"
                value={formData.expectedMoveOutDate}
                onChange={(e) => setFormData({ ...formData, expectedMoveOutDate: e.target.value })}
                inputSize="lg"
              />
            </div>
          </div>
        </div>

        <Button variant="gradient" size="lg" className="w-full" onClick={handleSubmit}>
          <User className="w-5 h-5 mr-2" />
          Add Tenant
        </Button>
      </div>
    </div>
  );
}
