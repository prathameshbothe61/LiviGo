import { useState } from "react";
import { IndianRupee, Send, Check, Search, Building2 } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const mockPGs = [
  { id: "1", name: "Sunrise PG" },
  { id: "2", name: "Green Valley PG" },
];

const mockTenantsByPG: Record<string, Array<{
  id: number;
  name: string;
  room: string;
  amount: number;
  status: "paid" | "pending";
  date: string | null;
  mode: string | null;
}>> = {
  "1": [
    { id: 1, name: "Rahul Sharma", room: "101", amount: 8000, status: "paid", date: "Jan 5", mode: "UPI" },
    { id: 2, name: "Amit Kumar", room: "102", amount: 8000, status: "pending", date: null, mode: null },
    { id: 3, name: "Vijay Singh", room: "102", amount: 8000, status: "pending", date: null, mode: null },
    { id: 4, name: "Priya Patel", room: "103", amount: 7500, status: "paid", date: "Jan 3", mode: "Cash" },
    { id: 5, name: "Sneha Gupta", room: "104", amount: 8000, status: "pending", date: null, mode: null },
    { id: 6, name: "Ravi Verma", room: "105", amount: 8000, status: "pending", date: null, mode: null },
  ],
  "2": [
    { id: 7, name: "Neha Joshi", room: "201", amount: 7500, status: "paid", date: "Jan 2", mode: "UPI" },
    { id: 8, name: "Karan Singh", room: "201", amount: 8000, status: "paid", date: "Jan 4", mode: "Cash" },
    { id: 9, name: "Ankita Sharma", room: "202", amount: 8000, status: "pending", date: null, mode: null },
    { id: 10, name: "Rohit Patil", room: "203", amount: 7500, status: "paid", date: "Jan 6", mode: "UPI" },
  ],
};

export default function RentManagement() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedPG, setSelectedPG] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "paid" | "pending">("all");

  const tenants = mockTenantsByPG[selectedPG] || [];
  
  const totalCollected = tenants.filter(t => t.status === "paid").reduce((sum, t) => sum + t.amount, 0);
  const totalPending = tenants.filter(t => t.status === "pending").reduce((sum, t) => sum + t.amount, 0);
  const total = totalCollected + totalPending;
  const progress = total > 0 ? Math.round((totalCollected / total) * 100) : 0;

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.room.includes(searchQuery);
    const matchesFilter = filter === "all" || tenant.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container">
      <PageHeader
        title="Rent Collection"
        rightAction={
          <Button variant="gradient" size="sm">
            <Send className="w-4 h-4 mr-1" />
            Remind All
          </Button>
        }
      />

      {/* Month Selector */}
      <div className="px-4 pb-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(index)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                selectedMonth === index
                  ? "gradient-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

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

        {/* Summary Card */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Collection Progress</h3>
            <span className="text-2xl font-bold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3 mb-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-success font-medium">₹{totalCollected.toLocaleString()} collected</span>
            <span className="text-pending font-medium">₹{totalPending.toLocaleString()} pending</span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tenant or room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Filter Chips - No Partial option */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {(["all", "paid", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                filter === f
                  ? f === "paid" ? "bg-success text-success-foreground" :
                    f === "pending" ? "bg-pending text-pending-foreground" :
                    "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Tenant List */}
        <div className="space-y-3">
          {filteredTenants.map((tenant) => (
            <div key={tenant.id} className="tenant-card animate-slide-up">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{tenant.name}</h4>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded">
                      Room {tenant.room}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5" />
                      {tenant.amount.toLocaleString()}
                    </span>
                    {tenant.date && (
                      <span>{tenant.date} • {tenant.mode}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={cn(
                    "status-badge",
                    tenant.status === "paid" ? "status-paid" : "status-pending"
                  )}>
                    {tenant.status === "paid" && <Check className="w-3 h-3 mr-1" />}
                    {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                  </span>
                  {tenant.status !== "paid" && (
                    <Button variant="success" size="sm">
                      Mark Paid
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
