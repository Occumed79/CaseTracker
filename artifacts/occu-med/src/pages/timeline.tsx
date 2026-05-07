import { motion } from "framer-motion";
import { CheckCircle2, Clock, Circle, ArrowRight } from "lucide-react";

const timelineSteps = [
  { id: 1, title: "Referral received", status: "completed", date: "Apr 1, 2026" },
  { id: 2, title: "Scheduling", status: "completed", date: "Apr 2, 2026" },
  { id: 3, title: "Appointment scheduled", status: "completed", date: "Apr 3, 2026" },
  { id: 4, title: "Authorization sent", status: "completed", date: "Apr 3, 2026" },
  { id: 5, title: "Appointment attended", status: "completed", date: "Apr 15, 2026" },
  { id: 6, title: "Results pending", status: "completed", date: "Apr 16, 2026" },
  { id: 7, title: "Results received", status: "completed", date: "Apr 20, 2026" },
  { id: 8, title: "Under SME medical review", status: "completed", date: "Apr 25, 2026" },
  { id: 9, title: "RDQA required", status: "current", date: "May 1, 2026" },
  { id: 10, title: "Additional info requested", status: "pending", date: "Pending" },
  { id: 11, title: "Additional info submitted", status: "pending", date: "Pending" },
  { id: 12, title: "Final recommendation", status: "pending", date: "Pending" },
  { id: 13, title: "Cleared / Accommodation / Waiver Required", status: "pending", date: "Pending" }
];

export default function Timeline() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Case Timeline</h1>
        <p className="text-muted-foreground text-sm">Track your medical readiness process.</p>
      </div>

      <div className="glass-card rounded-3xl p-6 relative">
        <div className="absolute left-[39px] top-8 bottom-8 w-px bg-white/10"></div>
        <div className="space-y-6">
          {timelineSteps.map((step, i) => {
            const isCompleted = step.status === "completed";
            const isCurrent = step.status === "current";
            const isPending = step.status === "pending";

            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 relative z-10"
              >
                <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                  isCompleted ? 'bg-primary border-primary text-primary-foreground' :
                  isCurrent ? 'bg-primary/20 border-primary text-primary glow-blue animate-pulse' :
                  'bg-black/50 border-white/20 text-white/30'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> :
                   isCurrent ? <Circle className="w-3 h-3 fill-current" /> :
                   <Circle className="w-3 h-3" />}
                </div>
                <div>
                  <h3 className={`text-sm font-medium ${isCompleted || isCurrent ? 'text-white' : 'text-white/40'}`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-1">{step.date}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
