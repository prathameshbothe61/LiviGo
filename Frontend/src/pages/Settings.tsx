import { useState, useRef } from "react";
import { 
  Building2, BedDouble, IndianRupee, Zap, Bell, LogOut, ChevronRight,
  User, Shield, HelpCircle, FileText, BarChart3, Lock, Camera, Wallet
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const settingsGroups = [
  {
    title: "Property Management",
    items: [
      { icon: Building2, label: "Manage PGs", description: "Add, edit, or remove PGs", path: "/pgs" },
      { icon: BedDouble, label: "Manage Rooms", description: "Configure rooms and beds", path: "/pgs" },
    ],
  },
  {
    title: "Billing Rules",
    items: [
      { icon: IndianRupee, label: "Rent Rules", description: "Set default rent amounts", path: "/rent" },
      { icon: Zap, label: "Electricity Rules", description: "Configure bill splitting", path: "/electricity" },
      { icon: Wallet, label: "Utilities Spending", description: "Track utility expenses", path: "/utilities-spending" },
    ],
  },
  {
    title: "Reports & Analytics",
    items: [
      { icon: BarChart3, label: "View Reports", description: "Income, expenses, profit", path: "/reports" },
    ],
  },
  {
    title: "Account Security",
    items: [
      { icon: Lock, label: "Change Password", description: "Update your password", path: "/change-password" },
      { icon: Camera, label: "Profile Photo", description: "Upload or change photo", path: "/profile-photo" },
    ],
  },
];

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/signin");
  };

  return (
    <div className="page-container">
      <PageHeader title="Settings" />

      <div className="content-container">
        {/* Profile Card */}
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => navigate("/profile-photo")}
            >
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{user?.name || "Pratham"}</h3>
              <p className="text-sm text-muted-foreground">{user?.email || "pratham@livigo.com"}</p>
              <p className="text-xs text-muted-foreground">+91 {user?.phone || "9876543210"}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/edit-profile")}>
              Edit
            </Button>
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Get alerts for rent & issues</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
              {group.title}
            </h3>
            <div className="stat-card divide-y divide-border/50">
              {group.items.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center justify-between py-3 ${index === 0 ? "" : "pt-3"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Help & Support */}
        <div className="stat-card divide-y divide-border/50">
          <Link to="#" className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">Help & Support</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link to="#" className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Shield className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">Privacy Policy</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link to="#" className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">Terms of Service</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>

        {/* Logout */}
        <Button
          variant="destructive"
          size="lg"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>

        <p className="text-center text-xs text-muted-foreground pb-4">
          LiviGo v1.0.0
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
