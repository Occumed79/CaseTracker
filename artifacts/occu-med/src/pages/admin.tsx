import { motion } from "framer-motion";
import { Users, Activity, AlertTriangle, Clock } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const metrics = [
    { title: "Active Cases", value: "142", icon: Users, color: "text-blue-400" },
    { title: "RDQA Required", value: "28", icon: AlertTriangle, color: "text-amber-400" },
    { title: "Waivers Pending", value: "15", icon: Clock, color: "text-purple-400" },
    { title: "Cleared Today", value: "8", icon: Activity, color: "text-emerald-400" },
  ];

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm">Case Manager Overview</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, i) => (
          <motion.div 
            key={metric.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 rounded-2xl border border-white/5"
          >
            <metric.icon className={`w-5 h-5 mb-2 ${metric.color}`} />
            <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
            <p className="text-xs text-white/60">{metric.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-semibold text-white/80">Recent Activity</h3>
          <Link href="/admin/cases" className="text-xs font-semibold text-primary">View All Cases</Link>
        </div>

        {[1, 2, 3].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="glass-card p-4 rounded-2xl border border-white/5 flex justify-between items-center"
          >
            <div>
              <p className="text-sm font-medium text-white">Alex Applicant</p>
              <p className="text-xs text-white/50">Uploaded Document: Cardiology_Clearance.pdf</p>
            </div>
            <span className="text-xs text-white/30">10m ago</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
