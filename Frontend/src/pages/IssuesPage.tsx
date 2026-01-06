import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageHeader } from "@/components/layout/PageHeader";
import { IssueCard } from "@/components/cards/IssueCard";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type IssueType = "wifi" | "plumbing" | "electricity" | "cleaning" | "other";
type IssueStatus = "open" | "in_progress" | "resolved";

interface Issue {
  id: number;
  roomNumber: string;
  type: IssueType;
  description: string;
  status: IssueStatus;
  dateRaised: string;
}

const initialIssues: Issue[] = [
  { id: 1, roomNumber: "102", type: "wifi", description: "WiFi not working since yesterday.", status: "open", dateRaised: "2 hours ago" },
  { id: 2, roomNumber: "105", type: "plumbing", description: "Bathroom tap is leaking.", status: "in_progress", dateRaised: "1 day ago" },
  { id: 3, roomNumber: "201", type: "electricity", description: "AC not cooling properly.", status: "open", dateRaised: "3 hours ago" },
  { id: 4, roomNumber: "103", type: "cleaning", description: "Common bathroom needs cleaning.", status: "resolved", dateRaised: "2 days ago" },
  { id: 5, roomNumber: "106", type: "wifi", description: "Very slow internet speed.", status: "open", dateRaised: "5 hours ago" },
];

export default function IssuesPage() {
  const [filter, setFilter] = useState<"all" | IssueStatus>("all");
  const [issues, setIssues] = useState<Issue[]>(initialIssues);

  const filteredIssues = issues.filter((issue) => 
    filter === "all" || issue.status === filter
  );

  const handleStatusChange = (id: number, newStatus: IssueStatus) => {
    setIssues(issues.map(issue => 
      issue.id === id ? { ...issue, status: newStatus } : issue
    ));
    toast({
      title: "Status Updated",
      description: `Issue has been marked as ${newStatus.replace("_", " ")}.`,
    });
  };

  const openCount = issues.filter(i => i.status === "open").length;
  const inProgressCount = issues.filter(i => i.status === "in_progress").length;

  return (
    <div className="page-container">
      <PageHeader
        title="Issues"
        rightAction={
          <span className="text-sm bg-pending/10 text-pending px-2 py-1 rounded-full font-medium">
            {openCount} open
          </span>
        }
      />

      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-3 rounded-xl bg-pending/10 border border-pending/20">
            <p className="text-xl font-bold text-pending">{openCount}</p>
            <p className="text-xs text-muted-foreground">Open</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-warning/10 border border-warning/20">
            <p className="text-xl font-bold text-warning">{inProgressCount}</p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-success/10 border border-success/20">
            <p className="text-xl font-bold text-success">
              {issues.filter(i => i.status === "resolved").length}
            </p>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {(["all", "open", "in_progress", "resolved"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                filter === f
                  ? f === "open" ? "bg-pending text-pending-foreground" :
                    f === "in_progress" ? "bg-warning text-warning-foreground" :
                    f === "resolved" ? "bg-success text-success-foreground" :
                    "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {f === "in_progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredIssues.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No issues found</p>
            </div>
          ) : (
            filteredIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                {...issue}
                onStatusChange={(status) => handleStatusChange(issue.id, status)}
              />
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
