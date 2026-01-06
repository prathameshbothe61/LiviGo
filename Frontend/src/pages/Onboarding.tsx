import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, BedDouble, IndianRupee, Zap, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pgName: "",
    address: "",
    city: "Pune",
    totalRooms: "",
    defaultRent: "",
    ownerContribution: "",
  });

  const updateForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      navigate("/dashboard");
    }
  };

  const isStep1Valid = formData.pgName && formData.address && formData.totalRooms && formData.defaultRent;
  const isStep2Valid = formData.ownerContribution;

  return (
    <div className="min-h-screen bg-background">
      {/* Progress */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Step {step} of 2</span>
          <span className="text-sm text-muted-foreground">
            {step === 1 ? "PG Details" : "Electricity Rules"}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary transition-all duration-500"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      <div className="p-6 animate-slide-up">
        {step === 1 ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Setup Your PG</h1>
                <p className="text-sm text-muted-foreground">Enter basic details</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">PG Name</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="e.g., Sunrise PG"
                    value={formData.pgName}
                    onChange={(e) => updateForm("pgName", e.target.value)}
                    inputSize="lg"
                    className="pl-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Full address"
                    value={formData.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    inputSize="lg"
                    className="pl-12"
                  />
                </div>
              </div>

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
                  <label className="text-sm font-medium text-foreground">Default Rent</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="e.g., 8000"
                      value={formData.defaultRent}
                      onChange={(e) => updateForm("defaultRent", e.target.value)}
                      inputSize="lg"
                      className="pl-12"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Electricity Rules</h1>
                <p className="text-sm text-muted-foreground">Set up bill splitting</p>
              </div>
            </div>

            <div className="stat-card mb-6">
              <h3 className="font-semibold text-foreground mb-2">How it works</h3>
              <p className="text-sm text-muted-foreground">
                You pay a fixed amount every month. The remaining electricity bill is split among tenants in each room.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Your Monthly Contribution
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="e.g., 1000"
                    value={formData.ownerContribution}
                    onChange={(e) => updateForm("ownerContribution", e.target.value)}
                    inputSize="lg"
                    className="pl-12"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  This amount will be deducted from the total bill before splitting
                </p>
              </div>

              <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Example Calculation</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      If bill is ₹1500 and your contribution is ₹1000, remaining ₹500 will be split among tenants
                    </p>
                  </div>
                </div>
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
            disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
          >
            {step === 1 ? "Continue" : "Save & Start"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {step === 2 && (
            <Button
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
