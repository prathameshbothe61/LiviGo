import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Building2, User, Mail, Phone, MapPin, ArrowRight, ArrowLeft,
  Users, Briefcase, GraduationCap, BedDouble, FileText, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

type Step = 1 | 2 | 3;

const STATES = ["Maharashtra", "Karnataka", "Gujarat", "Delhi", "Tamil Nadu", "Rajasthan"];
const CITIES: Record<string, string[]> = {
  Maharashtra: ["Pune", "Mumbai", "Nagpur", "Nashik"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Delhi: ["New Delhi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
};

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    // Step 1: Owner Details
    propertyName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    pincode: "",
    state: "Maharashtra",
    city: "Pune",
    // Step 2: PG Information
    whoCanStay: [] as string[],
    idealFor: [] as string[],
    totalRooms: "",
    occupiedRooms: "",
    occupancyType: [] as string[],
    // Step 3: Terms
    agreementDuration: "",
    securityDeposit: "",
    noticePeriod: "",
    agreeTerms: false,
  });

  const updateForm = <K extends keyof typeof formData>(
    key: K,
    value: typeof formData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (
    key: "whoCanStay" | "idealFor" | "occupancyType",
    value: string
  ) => {
    const current = formData[key];
    if (current.includes(value)) {
      updateForm(key, current.filter((v) => v !== value) as typeof formData[typeof key]);
    } else {
      updateForm(key, [...current, value] as typeof formData[typeof key]);
    }
  };

  const isStep1Valid = 
    formData.propertyName && 
    formData.ownerName && 
    formData.email && 
    formData.phone.length === 10 && 
    formData.password.length >= 6 &&
    formData.pincode.length === 6;

  const isStep2Valid = 
    formData.whoCanStay.length > 0 && 
    formData.idealFor.length > 0 && 
    formData.totalRooms && 
    formData.occupiedRooms &&
    formData.occupancyType.length > 0;

  const isStep3Valid = 
    formData.agreementDuration && 
    formData.securityDeposit && 
    formData.noticePeriod &&
    formData.agreeTerms;

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as Step);
    } else {
      // Submit registration
      toast({
        title: "Registration Successful!",
        description: "Welcome to LiviGo. Please sign in to continue.",
      });
      navigate("/signin");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step);
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Step {step} of 3</span>
          <span className="text-sm text-muted-foreground">
            {step === 1 ? "Owner Details" : step === 2 ? "PG Information" : "Terms & Conditions"}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 animate-slide-up">
        {step === 1 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Owner Details</h1>
                <p className="text-sm text-muted-foreground">Tell us about yourself</p>
              </div>
            </div>

            <div className="space-y-4">
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={(e) => updateForm("password", e.target.value)}
                  inputSize="lg"
                />
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
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-success" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">PG Information</h1>
                <p className="text-sm text-muted-foreground">Setup your property details</p>
              </div>
            </div>

            <div className="space-y-5">
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
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Terms & Conditions</h1>
                <p className="text-sm text-muted-foreground">Set your PG rules</p>
              </div>
            </div>

            <div className="space-y-5">
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

              <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Summary</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.agreementDuration && `${formData.agreementDuration} month agreement`}
                      {formData.securityDeposit && ` • ${formData.securityDeposit} month deposit`}
                      {formData.noticePeriod && ` • ${formData.noticePeriod === "0" ? "No" : `${formData.noticePeriod} days`} notice`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => updateForm("agreeTerms", checked)}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I agree to the <span className="text-primary">Terms of Service</span> and{" "}
                  <span className="text-primary">Privacy Policy</span>
                </label>
              </div>
            </div>
          </>
        )}

        <div className="mt-8 space-y-3">
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={handleNext}
            disabled={
              (step === 1 && !isStep1Valid) ||
              (step === 2 && !isStep2Valid) ||
              (step === 3 && !isStep3Valid)
            }
          >
            {step === 3 ? "Complete Registration" : "Continue"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={handleBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {step === 1 && (
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
