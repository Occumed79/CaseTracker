import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Circle, ArrowRight } from "lucide-react";

const waiverSteps = [
  { id: 1, title: "Waiver Required", desc: "Medical condition identified requiring waiver.", status: "completed" },
  { id: 2, title: "Packet Prepared", desc: "Occu-Med prepares your specific case file.", status: "completed" },
  { id: 3, title: "Submitted", desc: "Sent to the reviewing authority.", status: "current" },
  { id: 4, title: "Awaiting Determination", desc: "Under review by the authority.", status: "pending" },
  { id: 5, title: "Approved / Denied", desc: "Final decision received.", status: "pending" },
];

export default function Waiver() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Waiver Tracker</h1>
        <p className="text-muted-foreground text-sm">Track the status of your medical waiver.</p>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-3xl p-5 border border-emerald-500/20 relative overflow-hidden">
         <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
         <div className="flex gap-3 items-start relative z-10">
           <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-500 mt-1 shrink-0">
             <ShieldAlert className="w-5 h-5" />
           </div>
           <div>
             <h3 className="text-white font-medium mb-1">Waiver Process</h3>
             <p className="text-sm text-white/70 leading-relaxed">
               A waiver is a request for an exception to medical standards. It is currently being reviewed by the designated authority. This process typically takes 2-4 weeks.
             </p>
           </div>
         </div>
      </motion.div>

      <div className="glass-card rounded-3xl p-6 relative">
        <div className="absolute left-[39px] top-8 bottom-8 w-px bg-white/10"></div>
        <div className="space-y-8">
          {waiverSteps.map((step, i) => {
            const isCompleted = step.status === "completed";
            const isCurrent = step.status === "current";
            
            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 relative z-10"
              >
                <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                  isCompleted ? 'bg-emerald-500 border-emerald-500 text-black glow-green' :
                  isCurrent ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500 glow-green animate-pulse' :
                  'bg-black/50 border-white/20 text-white/30'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> :
                   isCurrent ? <Circle className="w-3 h-3 fill-current" /> :
                   <Circle className="w-3 h-3" />}
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isCompleted || isCurrent ? 'text-white' : 'text-white/40'}`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/60 mt-1">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
