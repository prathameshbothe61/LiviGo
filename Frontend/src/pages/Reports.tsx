import { useState } from "react";
import { TrendingUp, TrendingDown, IndianRupee, Download, FileText, FileSpreadsheet } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const reportData = {
    income: 349000,
    expenses: 45000,
    profit: 304000,
    occupancyRate: 87,
    rentCollectionRate: 82,
  };

  const handleDownload = (format: "pdf" | "excel") => {
    toast({
      title: `Downloading ${format.toUpperCase()}`,
      description: `Your ${months[selectedMonth]} report is being prepared.`,
    });
  };

  return (
    <div className="page-container">
      <PageHeader title="Reports" showBack />

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
        {/* Main Stats */}
        <div className="grid grid-cols-1 gap-4">
          {/* Income Card */}
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Income</p>
                <p className="text-3xl font-bold text-foreground">
                  ₹{reportData.income.toLocaleString()}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-success" />
              </div>
            </div>
          </div>

          {/* Expenses Card */}
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                <p className="text-3xl font-bold text-foreground">
                  ₹{reportData.expenses.toLocaleString()}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-pending/10 flex items-center justify-center">
                <TrendingDown className="w-7 h-7 text-pending" />
              </div>
            </div>
          </div>

          {/* Profit Card */}
          <div className="stat-card border-2 border-success/30 bg-success/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
                <p className="text-3xl font-bold text-success">
                  ₹{reportData.profit.toLocaleString()}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-success/20 flex items-center justify-center">
                <IndianRupee className="w-7 h-7 text-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="stat-card">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Occupancy Rate
            </p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-primary">{reportData.occupancyRate}%</p>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full gradient-primary rounded-full transition-all duration-500"
                style={{ width: `${reportData.occupancyRate}%` }}
              />
            </div>
          </div>

          <div className="stat-card">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Rent Collection
            </p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-success">{reportData.rentCollectionRate}%</p>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-success rounded-full transition-all duration-500"
                style={{ width: `${reportData.rentCollectionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Download Options */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Download Report</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-col h-auto py-4"
              onClick={() => handleDownload("pdf")}
            >
              <FileText className="w-8 h-8 mb-2 text-pending" />
              <span>Download PDF</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-col h-auto py-4"
              onClick={() => handleDownload("excel")}
            >
              <FileSpreadsheet className="w-8 h-8 mb-2 text-success" />
              <span>Download Excel</span>
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
