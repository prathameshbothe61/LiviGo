import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, User, Mail, Phone, MapPin, ArrowLeft, Save,
  Users, Briefcase, GraduationCap, BedDouble, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STATES = ["Maharashtra", "Karnataka", "Gujarat", "Delhi", "Tamil Nadu", "Rajasthan"];
const CITIES: Record<string, string[]> = {
  Maharashtra: ["Pune", "Mumbai", "Nagpur", "Nashik"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Delhi: ["New Delhi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
};

export default function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Owner Details
    propertyName: "Sunrise PG",
    ownerName: "Pratham",
    email: "pratham@example.com",
    phone: "9876543210",
    pincode: "411001",
    state: "Maharashtra",
    city: "Pune",
    // PG Information
    whoCanStay: ["Boys", "Girls"] as string[],
    idealFor: ["Student", "Working Professional"] as string[],
    totalRooms: "15",
    occupiedRooms: "12",
    occupancyType: ["Single", "Double"] as string[],
    // Terms
    agreementDuration: "11",
    securityDeposit: "2",
    noticePeriod: "30",
  });

  const updateForm = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (key: string, value: string) => {
    const current = formData[key as keyof typeof formData] as string[];
    if (current.includes(value)) {
      updateForm(key, current.filter((v) => v !== value));
    } else {
      updateForm(key, [...current, value]);
    }
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">Edit Profile</h1>
      </div>

      <Tabs defaultValue="details" className="px-4">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="pg-info">PG Info</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
        </TabsList>

        {/* Owner Details Tab */}
        <TabsContent value="details" className="space-y-4 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Owner Details</h2>
              <p className="text-xs text-muted-foreground">Update your personal info</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Property Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="e.g., Sunrise PG"
                value={formData.propertyName}
                onChange={(e) => updateForm("propertyName", e.target.value)}
                inputSize="lg"
                className="pl-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Owner Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Your full name"
                value={formData.ownerName}
                onChange={(e) => updateForm("ownerName", e.target.value)}
                inputSize="lg"
                className="pl-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  inputSize="lg"
                  className="pl-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="10-digit"
                  value={formData.phone}
                  onChange={(e) => updateForm("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  inputSize="lg"
                  className="pl-12"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Pincode</label>
              <Input
                placeholder="411001"
                value={formData.pincode}
                onChange={(e) => updateForm("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputSize="lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">State</label>
              <Select value={formData.state} onValueChange={(v) => { updateForm("state", v); updateForm("city", CITIES[v]?.[0] || ""); }}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">City</label>
              <Select value={formData.city} onValueChange={(v) => updateForm("city", v)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(CITIES[formData.state] || []).map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        {/* PG Information Tab */}
        <TabsContent value="pg-info" className="space-y-5 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">PG Information</h2>
              <p className="text-xs text-muted-foreground">Update your property details</p>
            </div>
          </div>

          {/* Who Can Stay */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Who can stay?</label>
            <div className="flex flex-wrap gap-2">
              {["Boys", "Girls", "Co-Living"].map((option) => (
                <button
                  key={option}
                  onClick={() => toggleArrayValue("whoCanStay", option)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    formData.whoCanStay.includes(option)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Ideal For */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Ideal for</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => toggleArrayValue("idealFor", "Student")}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  formData.idealFor.includes("Student")
                    ? "bg-primary/10 border-primary"
                    : "bg-background border-border hover:border-primary"
                }`}
              >
                <GraduationCap className={`w-6 h-6 ${formData.idealFor.includes("Student") ? "text-primary" : "text-muted-foreground"}`} />
                <span className="font-medium">Students</span>
              </button>
              <button
                onClick={() => toggleArrayValue("idealFor", "Working Professional")}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  formData.idealFor.includes("Working Professional")
                    ? "bg-primary/10 border-primary"
                    : "bg-background border-border hover:border-primary"
                }`}
              >
                <Briefcase className={`w-6 h-6 ${formData.idealFor.includes("Working Professional") ? "text-primary" : "text-muted-foreground"}`} />
                <span className="font-medium">Professionals</span>
              </button>
            </div>
          </div>

          {/* Rooms */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Total Rooms</label>
              <div className="relative">
                <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="e.g., 10"
                  value={formData.totalRooms}
                  onChange={(e) => updateForm("totalRooms", e.target.value)}
                  inputSize="lg"
                  className="pl-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Occupied Rooms</label>
              <div className="relative">
                <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="e.g., 8"
                  value={formData.occupiedRooms}
                  onChange={(e) => updateForm("occupiedRooms", e.target.value)}
                  inputSize="lg"
                  className="pl-12"
                />
              </div>
            </div>
          </div>

          {/* Occupancy Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Occupancy Types</label>
            <div className="flex flex-wrap gap-2">
              {["Single", "Double", "Triple"].map((option) => (
                <button
                  key={option}
                  onClick={() => toggleArrayValue("occupancyType", option)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    formData.occupancyType.includes(option)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Terms Tab */}
        <TabsContent value="terms" className="space-y-5 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Terms & Conditions</h2>
              <p className="text-xs text-muted-foreground">Update your PG rules</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Agreement Duration</label>
            <Select value={formData.agreementDuration} onValueChange={(v) => updateForm("agreementDuration", v)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 6, 9, 11, 12].map((months) => (
                  <SelectItem key={months} value={String(months)}>
                    {months} {months === 1 ? "Month" : "Months"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Security Deposit</label>
            <Select value={formData.securityDeposit} onValueChange={(v) => updateForm("securityDeposit", v)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select deposit months" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((months) => (
                  <SelectItem key={months} value={String(months)}>
                    {months} {months === 1 ? "Month" : "Months"} Rent
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Notice Period</label>
            <Select value={formData.noticePeriod} onValueChange={(v) => updateForm("noticePeriod", v)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select notice period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No Notice Required</SelectItem>
                {[7, 15, 30, 45, 60, 90].map((days) => (
                  <SelectItem key={days} value={String(days)}>
                    {days} Days
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="px-4 mt-6">
        <Button onClick={handleSave} className="w-full h-14 text-lg" variant="gradient">
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
