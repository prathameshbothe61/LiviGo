import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, BedDouble, Users, IndianRupee, AlertTriangle, ChevronDown, Bell, UserPlus, Calendar } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { StatCard } from "@/components/cards/StatCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const mockPGs = [
  { id: "1", name: "Sunrise PG" },
  { id: "2", name: "Green Valley PG" },
];

const mockStatsByPG: Record<string, {
  totalRooms: number;
  totalTenants: number;
  vacantBeds: number;
  rentCollected: number;
  rentPending: number;
  openIssues: number;
  pendingTenants: Array<{ name: string; amount: number; room: string }>;
  upcomingVacancies: Array<{ tenantName: string; room: string; vacatingDate: string }>;
}> = {
  "1": {
    totalRooms: 12,
    totalTenants: 28,
    vacantBeds: 4,
    rentCollected: 168000,
    rentPending: 32000,
    openIssues: 2,
    pendingTenants: [
      { name: "Amit Kumar", amount: 8000, room: "102" },
      { name: "Vijay Singh", amount: 8000, room: "102" },
      { name: "Sneha Gupta", amount: 8000, room: "104" },
      { name: "Ravi Verma", amount: 8000, room: "105" },
    ],
    upcomingVacancies: [
      { tenantName: "Rahul Sharma", room: "101", vacatingDate: "Jan 25, 2025" },
    ],
  },
  "2": {
    totalRooms: 12,
    totalTenants: 17,
    vacantBeds: 3,
    rentCollected: 117000,
    rentPending: 32000,
    openIssues: 1,
    pendingTenants: [
      { name: "Ankita Sharma", amount: 8000, room: "202" },
    ],
    upcomingVacancies: [
      { tenantName: "Karan Singh", room: "201", vacatingDate: "Feb 10, 2025" },
    ],
  },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedPG, setSelectedPG] = useState("1");
  const [showPendingDetails, setShowPendingDetails] = useState(false);

  const stats = mockStatsByPG[selectedPG];
  const rentProgress = Math.round((stats.rentCollected / (stats.rentCollected + stats.rentPending)) * 100);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="page-container">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">{getGreeting()},</p>
            <h1 className="text-2xl font-bold text-foreground">{user?.name || "Pratham"} 👋</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate("/add-tenant")}>
              <UserPlus className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedMonth === index
                  ? "gradient-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </header>

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

        {/* Rent Progress Card */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Rent Collection</h3>
            <span className="text-2xl font-bold text-primary">{rentProgress}%</span>
          </div>
          <Progress value={rentProgress} className="h-3 mb-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-success font-medium">₹{stats.rentCollected.toLocaleString()} collected</span>
            <span className="text-pending font-medium">₹{stats.rentPending.toLocaleString()} pending</span>
          </div>
        </div>

        {/* Alert Cards */}
        <div className="space-y-3">
          {/* Pending Rent Alert */}
          {stats.pendingTenants.length > 0 && (
            <div className="rounded-xl bg-pending/10 border border-pending/20 animate-slide-up overflow-hidden">
              <button
                onClick={() => setShowPendingDetails(!showPendingDetails)}
                className="flex items-center gap-3 p-4 w-full text-left"
              >
                <div className="w-10 h-10 rounded-full bg-pending/20 flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-pending" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{stats.pendingTenants.length} tenants have pending rent</p>
                  <p className="text-sm text-muted-foreground">Total: ₹{stats.rentPending.toLocaleString()}</p>
                </div>
                <ChevronDown className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform",
                  showPendingDetails && "rotate-180"
                )} />
              </button>
              
              {showPendingDetails && (
                <div className="px-4 pb-4 space-y-2">
                  {stats.pendingTenants.map((tenant, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{tenant.name}</p>
                        <p className="text-xs text-muted-foreground">Room {tenant.room}</p>
                      </div>
                      <p className="font-semibold text-pending">₹{tenant.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Upcoming Vacancies Alert */}
          {stats.upcomingVacancies.length > 0 && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 animate-slide-up">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Upcoming Vacancies</p>
                {stats.upcomingVacancies.map((vacancy, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">
                    {vacancy.tenantName} (Room {vacancy.room}) - {vacancy.vacatingDate}
                  </p>
                ))}
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground rotate-[-90deg]" />
            </div>
          )}

          {stats.openIssues > 0 && (
            <Link to="/issues" className="flex items-center gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20 animate-slide-up">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{stats.openIssues} open issues</p>
                <p className="text-sm text-muted-foreground">Tap to view</p>
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground rotate-[-90deg]" />
            </Link>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={BedDouble}
            label="Total Rooms"
            value={stats.totalRooms}
            variant="default"
          />
          <StatCard
            icon={Users}
            label="Tenants"
            value={stats.totalTenants}
            variant="success"
          />
          <StatCard
            icon={BedDouble}
            label="Vacant Beds"
            value={stats.vacantBeds}
            variant="warning"
          />
          <StatCard
            icon={IndianRupee}
            label="Collected"
            value={`₹${(stats.rentCollected / 1000).toFixed(0)}K`}
            variant="success"
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
