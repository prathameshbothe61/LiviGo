import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export default function OTPVerify() {
  const navigate = useNavigate();
  const { verifyOTP, pendingAuth, setPendingAuth } = useAuth();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length < 6) return;

    setIsLoading(true);
    const success = await verifyOTP(otp);
    setIsLoading(false);

    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setPendingAuth(null);
    navigate("/signin");
  };

  const maskedContact = pendingAuth?.emailOrPhone
    ? pendingAuth.emailOrPhone.includes("@")
      ? pendingAuth.emailOrPhone.replace(/(.{2})(.*)(@.*)/, "$1***$3")
      : `+91 ${pendingAuth.emailOrPhone.slice(0, 2)}****${pendingAuth.emailOrPhone.slice(-2)}`
    : "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-lg animate-scale-in">
          <Building2 className="w-10 h-10 text-primary-foreground" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">
          Verify OTP
        </h1>
        <p className="text-muted-foreground text-center mb-2 animate-fade-in">
          Enter the 6-digit code sent to
        </p>
        <p className="text-foreground font-medium mb-8 animate-fade-in">
          {maskedContact}
        </p>

        <div className="w-full max-w-sm space-y-4 animate-slide-up">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Enter OTP
            </label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputSize="lg"
                className="pl-12 tracking-[0.5em] text-center font-mono text-lg"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Demo OTP: <span className="font-mono font-medium">123456</span>
            </p>
          </div>

          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={handleVerify}
            disabled={otp.length < 6 || isLoading}
          >
            {isLoading ? "Verifying..." : "Verify & Continue"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <div className="flex items-center justify-between pt-2">
            <button
              className="text-sm text-primary font-medium flex items-center gap-1"
              onClick={handleBack}
            >
              <ArrowLeft className="w-4 h-4" />
              Change Email/Phone
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground">
              Resend OTP
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          Didn't receive the code? Check your spam folder
        </p>
      </div>
    </div>
  );
}
