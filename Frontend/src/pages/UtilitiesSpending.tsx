import { useState } from "react";
import { Zap, Droplets, Wifi, Wrench, Plus, Building2 } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const mockPGs = [
  { id: "1", name: "Sunrise PG" },
  { id: "2", name: "Green Valley PG" },
];

const mockExpenses = [
  { id: 1, category: "electricity", description: "Electricity Bill - January", amount: 4500, date: "Jan 15", pg: "1" },
  { id: 2, category: "water", description: "Water Bill", amount: 1200, date: "Jan 10", pg: "1" },
  { id: 3, category: "wifi", description: "Internet Connection", amount: 1500, date: "Jan 5", pg: "1" },
  { id: 4, category: "maintenance", description: "Plumbing Repair", amount: 800, date: "Jan 8", pg: "1" },
  { id: 5, category: "electricity", description: "Electricity Bill - January", amount: 3200, date: "Jan 15", pg: "2" },
  { id: 6, category: "water", description: "Water Bill", amount: 900, date: "Jan 10", pg: "2" },
  { id: 7, category: "maintenance", description: "AC Servicing", amount: 1500, date: "Jan 12", pg: "2" },
];

const categoryIcons = {
  electricity: { icon: Zap, color: "text-warning", bg: "bg-warning/10" },
  water: { icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10" },
  wifi: { icon: Wifi, color: "text-primary", bg: "bg-primary/10" },
  maintenance: { icon: Wrench, color: "text-muted-foreground", bg: "bg-muted" },
};

export default function UtilitiesSpending() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedPG, setSelectedPG] = useState("all");

  const filteredExpenses = mockExpenses.filter(
    exp => selectedPG === "all" || exp.pg === selectedPG
  );

  const totalByCategory = filteredExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const totalSpending = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="page-container">
      <PageHeader
        title="Utilities Spending"
        showBack
        rightAction={
          <Button variant="gradient" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add
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
        {/* PG Filter */}
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-muted-foreground" />
          <Select value={selectedPG} onValueChange={setSelectedPG}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select PG" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All PGs</SelectItem>
              {mockPGs.map((pg) => (
                <SelectItem key={pg.id} value={pg.id}>
                  {pg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Total Spending Card */}
        <div className="stat-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Spending</h3>
          <p className="text-3xl font-bold text-pending">₹{totalSpending.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {months[selectedMonth]} 2025 • {selectedPG === "all" ? "All PGs" : mockPGs.find(p => p.id === selectedPG)?.name}
          </p>
        </div>

        {/* Category Summary */}
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(categoryIcons).map(([category, { icon: Icon, color, bg }]) => (
            <div key={category} className="stat-card">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-2", bg)}>
                <Icon className={cn("w-5 h-5", color)} />
              </div>
              <p className="text-lg font-bold text-foreground">
                ₹{(totalByCategory[category] || 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground capitalize">{category}</p>
            </div>
          ))}
        </div>

        {/* Expenses List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Recent Expenses</h3>
          
          {filteredExpenses.map((expense) => {
            const { icon: Icon, color, bg } = categoryIcons[expense.category as keyof typeof categoryIcons];
            const pgName = mockPGs.find(p => p.id === expense.pg)?.name;
            
            return (
              <div key={expense.id} className="tenant-card animate-slide-up">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", bg)}>
                    <Icon className={cn("w-5 h-5", color)} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.date} • {pgName}</p>
                  </div>
                  <p className="font-bold text-pending">-₹{expense.amount.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
