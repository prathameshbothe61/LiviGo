import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, BedDouble, Users, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const stayOptions = ["Boys", "Girls", "Co-living"];
const idealForOptions = ["Student", "Working Professional"];
const occupancyOptions = ["Single", "Double", "Triple"];

export default function AddPG() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pgName: "",
    address: "",
    city: "Pune",
    state: "Maharashtra",
    pinCode: "",
    totalRooms: "",
    occupiedRooms: "",
    whoCanStay: [] as string[],
    idealFor: [] as string[],
    occupancyTypes: [] as string[],
    defaultRent: "",
  });

  const toggleSelection = (field: "whoCanStay" | "idealFor" | "occupancyTypes", value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = () => {
    if (!formData.pgName || !formData.address || !formData.totalRooms) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "PG Added Successfully",
      description: `${formData.pgName} has been added to your properties.`,
    });
    navigate("/pgs");
  };

  return (
    <div className="page-container">
      <PageHeader title="Add New PG" showBack />

      <div className="content-container space-y-6 pb-8">
        {/* Basic Details */}
        <div className="stat-card space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">PG Details</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">PG Name *</label>
              <Input
                placeholder="e.g., Sunrise PG"
                value={formData.pgName}
                onChange={(e) => setFormData({ ...formData, pgName: e.target.value })}
                inputSize="lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Address *</label>
              <Input
                placeholder="Full address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                inputSize="lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground">City</label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  inputSize="lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Pin Code</label>
                <Input
                  placeholder="411001"
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                  inputSize="lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Who Can Stay */}
        <div className="stat-card space-y-4">
          <h3 className="font-semibold text-foreground">Who Can Stay?</h3>
          <div className="flex flex-wrap gap-2">
            {stayOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleSelection("whoCanStay", option)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  formData.whoCanStay.includes(option)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {formData.whoCanStay.includes(option) && <Check className="w-4 h-4 inline mr-1" />}
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Ideal For */}
        <div className="stat-card space-y-4">
          <h3 className="font-semibold text-foreground">Ideal For</h3>
          <div className="flex flex-wrap gap-2">
            {idealForOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleSelection("idealFor", option)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  formData.idealFor.includes(option)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {formData.idealFor.includes(option) && <Check className="w-4 h-4 inline mr-1" />}
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Room Details */}
        <div className="stat-card space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <BedDouble className="w-5 h-5 text-success" />
            </div>
            <h3 className="font-semibold text-foreground">Room Details</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground">Total Rooms *</label>
              <Input
                type="number"
                placeholder="12"
                value={formData.totalRooms}
                onChange={(e) => setFormData({ ...formData, totalRooms: e.target.value })}
                inputSize="lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Occupied Rooms</label>
              <Input
                type="number"
                placeholder="10"
                value={formData.occupiedRooms}
                onChange={(e) => setFormData({ ...formData, occupiedRooms: e.target.value })}
                inputSize="lg"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Occupancy Types</label>
            <div className="flex flex-wrap gap-2">
              {occupancyOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleSelection("occupancyTypes", option)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    formData.occupancyTypes.includes(option)
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {formData.occupancyTypes.includes(option) && <Check className="w-4 h-4 inline mr-1" />}
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Default Rent (₹)</label>
            <Input
              type="number"
              placeholder="8000"
              value={formData.defaultRent}
              onChange={(e) => setFormData({ ...formData, defaultRent: e.target.value })}
              inputSize="lg"
            />
          </div>
        </div>

        <Button variant="gradient" size="lg" className="w-full" onClick={handleSubmit}>
          <Building2 className="w-5 h-5 mr-2" />
          Add PG
        </Button>
      </div>
    </div>
  );
}
