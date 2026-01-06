import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Building2, Mail, Phone, Lock, ArrowRight, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

type UserType = "owner" | "tenant";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState<UserType>("owner");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmail = emailOrPhone.includes("@");
  const isValidInput = isEmail 
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone)
    : emailOrPhone.replace(/\D/g, "").length === 10;

  const handleSignIn = async () => {
    if (!isValidInput || password.length < 6) return;

    setIsLoading(true);
    const success = await login(emailOrPhone, password);
    setIsLoading(false);

    if (success) {
      navigate("/otp-verify");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-lg animate-scale-in">
          <Building2 className="w-10 h-10 text-primary-foreground" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">
          LiviGo
        </h1>
        <p className="text-muted-foreground text-center mb-8 animate-fade-in">
          Manage your PG easily
        </p>

        {/* User Type Toggle */}
        <div className="w-full max-w-sm mb-6 animate-slide-up">
          <div className="flex bg-muted rounded-xl p-1">
            <button
              onClick={() => setUserType("owner")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                userType === "owner"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              <User className="w-4 h-4" />
              Owner
            </button>
            <button
              onClick={() => setUserType("tenant")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                userType === "tenant"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              Tenant
            </button>
          </div>
        </div>

        {userType === "tenant" ? (
          <div className="w-full max-w-sm text-center animate-fade-in">
            <div className="p-6 rounded-xl bg-muted/50 border border-border">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Coming Soon!</h3>
              <p className="text-sm text-muted-foreground">
                Tenant app is under development. Please check back later.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-4 animate-slide-up">
            {/* Email/Phone Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email or Phone Number
              </label>
              <div className="relative">
                {isEmail ? (
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                ) : (
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                )}
                <Input
                  type="text"
                  placeholder="Enter email or 10-digit phone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  inputSize="lg"
                  className="pl-12"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  inputSize="lg"
                  className="pl-12"
                />
              </div>
            </div>

            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={handleSignIn}
              disabled={!isValidInput || password.length < 6 || isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                New to LiviGo?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
