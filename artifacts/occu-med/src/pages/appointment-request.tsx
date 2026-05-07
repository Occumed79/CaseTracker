import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { PhoneCall, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AppointmentRequest() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Request Submitted", description: "A case manager will call you at the requested time." });
      setLocation("/");
    }, 1000);
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Request Phone Appointment</h1>
        <p className="text-muted-foreground text-sm">Schedule a call with your case manager.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-6 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-2">
            <Label className="text-white/80">Reason for Call</Label>
            <Select required>
              <SelectTrigger className="bg-black/20 border-white/10 text-white h-12 rounded-xl">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-white/10">
                <SelectItem value="rdqa">Questions about RDQA / Requirements</SelectItem>
                <SelectItem value="waiver">Waiver process update</SelectItem>
                <SelectItem value="scheduling">Help scheduling an appointment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white/80">Preferred Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input type="date" required className="pl-10 bg-black/20 border-white/10 text-white h-12 rounded-xl [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white/80">Preferred Time Block</Label>
            <Select required>
              <SelectTrigger className="bg-black/20 border-white/10 text-white h-12 rounded-xl">
                <SelectValue placeholder="Select a time block" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-white/10">
                <SelectItem value="morning">Morning (8am - 12pm EST)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12pm - 4pm EST)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white/80">Additional Details</Label>
            <Textarea placeholder="Any specific questions you want answered?" className="bg-black/20 border-white/10 text-white resize-none h-24 rounded-xl" />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-base mt-4 glow-red shimmer-btn">
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>

        </form>
      </motion.div>
    </div>
  );
}
