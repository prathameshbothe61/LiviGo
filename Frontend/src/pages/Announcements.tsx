import { useState } from "react";
import { Plus, Megaphone } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnnouncementCard } from "@/components/cards/AnnouncementCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const mockAnnouncements = [
  { 
    title: "Rent Deadline Reminder", 
    message: "Please pay your rent by 5th of this month to avoid late fees.", 
    date: "Jan 2, 2024", 
    type: "warning" as const 
  },
  { 
    title: "Water Cut Tomorrow", 
    message: "There will be no water supply from 10 AM to 4 PM due to maintenance.", 
    date: "Jan 1, 2024", 
    type: "urgent" as const 
  },
  { 
    title: "WiFi Password Changed", 
    message: "New WiFi password is SunrisePG2024. Please update on all your devices.", 
    date: "Dec 28, 2023", 
    type: "info" as const 
  },
  { 
    title: "New Washing Machine", 
    message: "We have added a new washing machine. Please use it carefully.", 
    date: "Dec 25, 2023", 
    type: "info" as const 
  },
];

export default function Announcements() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "warning" | "urgent">("info");

  const handleCreate = () => {
    if (title && message) {
      toast({
        title: "Announcement Created",
        description: "Your announcement has been sent to all tenants.",
      });
      setOpen(false);
      setTitle("");
      setMessage("");
      setType("info");
    }
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Announcements"
        rightAction={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5" />
                  New Announcement
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="e.g., Water Cut Tomorrow"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Enter your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <div className="flex gap-2">
                    {(["info", "warning", "urgent"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          type === t
                            ? t === "info" ? "bg-primary text-primary-foreground" :
                              t === "warning" ? "bg-warning text-warning-foreground" :
                              "bg-pending text-pending-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  variant="gradient"
                  className="w-full"
                  onClick={handleCreate}
                  disabled={!title || !message}
                >
                  Send Announcement
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="content-container">
        <div className="space-y-3">
          {mockAnnouncements.map((announcement, index) => (
            <AnnouncementCard key={index} {...announcement} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
