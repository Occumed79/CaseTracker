import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ExtensionRequest() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Extension Requested", description: "Your request is pending review by your case manager." });
      setLocation("/");
    }, 1000);
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Request Extension</h1>
        <p className="text-muted-foreground text-sm">Need more time to gather medical records?</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-6 border border-white/10">
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl mb-6">
          <p className="text-xs text-rose-400 leading-relaxed">
            Extensions are typically granted if you have scheduled a provider appointment but cannot be seen before your deadline.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-2">
            <Label className="text-white/80">Why do you need an extension?</Label>
            <Textarea required placeholder="E.g., Earliest available cardiology appointment is June 1st." className="bg-black/20 border-white/10 text-white resize-none h-24 rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label className="text-white/80">Requested New Deadline</Label>
            <Input type="date" required className="bg-black/20 border-white/10 text-white h-12 rounded-xl [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]" />
          </div>

          <div className="pt-2">
            <Label className="text-white/80 block mb-3">Do you have an appointment scheduled?</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-white/70 text-sm">
                <input type="radio" name="appt" value="yes" required className="w-4 h-4 bg-black/20 border-white/20" /> Yes
              </label>
              <label className="flex items-center gap-2 text-white/70 text-sm">
                <input type="radio" name="appt" value="no" required className="w-4 h-4 bg-black/20 border-white/20" /> No
              </label>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base mt-6 glow-blue shimmer-btn">
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>

        </form>
      </motion.div>
    </div>
  );
}
