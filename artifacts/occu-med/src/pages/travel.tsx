import { motion } from "framer-motion";
import { Plane, CheckCircle2, AlertCircle, Clock, Globe } from "lucide-react";

const requirements = [
  { id: 1, title: "Passport Validity", status: "Valid", detail: "Expires Oct 2028 (Requires 6+ months)", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-400/10" },
  { id: 2, title: "Vaccine Readiness", status: "Pending", detail: "Yellow Fever booster needed", icon: Clock, color: "text-amber-400 bg-amber-400/10" },
  { id: 3, title: "Waiver Status", status: "In Progress", detail: "Awaiting final determination", icon: Clock, color: "text-blue-400 bg-blue-400/10" },
  { id: 4, title: "Deployment Eligibility", status: "Not Cleared", detail: "Medical clearance required first", icon: AlertCircle, color: "text-rose-400 bg-rose-400/10" },
];

export default function TravelReadiness() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Travel Readiness</h1>
        <p className="text-muted-foreground text-sm">Deployment and travel requirements.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-5 border border-primary/20 relative overflow-hidden bg-primary/5">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary glow-blue shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white font-bold">Region: CENTCOM</h2>
            <p className="text-xs text-white/60">Requirements loaded for specific Area of Responsibility (AOR)</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-3">
        {requirements.map((req, i) => (
          <motion.div 
            key={req.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-4`}
          >
            <div className={`p-3 rounded-xl shrink-0 ${req.color}`}>
              <req.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{req.title}</h3>
              <p className="text-xs text-white/60 mt-0.5">{req.detail}</p>
            </div>
            <div className="ml-auto">
              <span className={`text-[10px] uppercase font-bold tracking-wider ${req.color.split(' ')[0]}`}>{req.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
