import { mockTasks } from "@/data/mockData";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle, UploadCloud, Eye } from "lucide-react";
import { Link } from "wouter";

export default function Tasks() {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Task Checklist</h1>
        <p className="text-muted-foreground text-sm">Complete these items to progress your case.</p>
      </div>

      <div className="space-y-3">
        {mockTasks.map((task, i) => (
          <TaskCard key={task.id} task={task} index={i} />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task, index }: { task: any, index: number }) {
  let statusColor = "text-blue-400 bg-blue-400/10 border-blue-400/20";
  let statusGlow = "";
  let Icon = Clock;

  if (task.status === "Complete") {
    statusColor = "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    Icon = CheckCircle2;
  } else if (task.status === "Urgent") {
    statusColor = "text-rose-400 bg-rose-400/10 border-rose-400/20";
    statusGlow = "glow-red";
    Icon = AlertCircle;
  } else if (task.status === "Missing" || task.status === "Needs Correction") {
    statusColor = "text-amber-400 bg-amber-400/10 border-amber-400/20";
    Icon = AlertCircle;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`glass-card p-4 rounded-2xl flex flex-col gap-3 border ${task.status === "Urgent" ? "border-rose-500/30" : "border-white/5"} ${statusGlow}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 p-1.5 rounded-full ${statusColor}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-white font-medium">{task.title}</h3>
            <p className="text-xs text-white/50 mt-1">Due: {task.dueDate} • By: {task.responsible}</p>
          </div>
        </div>
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ${statusColor}`}>
          {task.status}
        </span>
      </div>
      
      {task.action !== "View" && (
        <div className="flex justify-end pt-2 border-t border-white/5">
          <Link href={task.action === "Upload" ? "/uploads" : "/more"} className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-lg">
            {task.action === "Upload" ? <UploadCloud className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {task.action}
          </Link>
        </div>
      )}
    </motion.div>
  );
}
