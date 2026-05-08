import { mockTasks } from "@/data/mockData";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle, UploadCloud, Eye, XCircle } from "lucide-react";
import { Link } from "wouter";

const BADGE_MAP: Record<string, { cls: string; icon: any; border: string }> = {
  Complete:         { cls: "badge-complete",   icon: CheckCircle2, border: "rgba(34,197,94,0.18)" },
  Pending:          { cls: "badge-pending",    icon: Clock,        border: "rgba(59,130,246,0.18)" },
  Missing:          { cls: "badge-missing",    icon: AlertCircle,  border: "rgba(245,158,11,0.18)" },
  Urgent:           { cls: "badge-urgent",     icon: AlertCircle,  border: "rgba(239,68,68,0.22)" },
  "Needs Correction": { cls: "badge-correction", icon: XCircle,   border: "rgba(139,92,246,0.18)" },
};

export default function Tasks() {
  const counts = {
    Urgent: mockTasks.filter(t => t.status === "Urgent").length,
    Missing: mockTasks.filter(t => t.status === "Missing").length,
  };

  return (
    <div className="p-4 space-y-5 pb-8">
      {/* Header */}
      <div className="pt-2">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(147,197,253,0.65)" }}>
          Your Checklist
        </p>
        <h1 className="text-3xl font-bold text-white tracking-tight">Task List</h1>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          Complete these items to progress your case.
        </p>
      </div>

      {/* Alert banner if urgent/missing */}
      {(counts.Urgent > 0 || counts.Missing > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-3.5 flex items-center gap-3"
          style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.28)" }}
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: "rgb(252,165,165)" }} />
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.78)" }}>
            {counts.Urgent > 0 && <><span style={{ color: "rgb(252,165,165)" }} className="font-bold">{counts.Urgent} urgent</span> {counts.Missing > 0 ? "and " : "item"}</>}
            {counts.Missing > 0 && <><span style={{ color: "rgb(253,230,138)" }} className="font-bold">{counts.Missing} missing</span> item{counts.Missing > 1 ? "s" : ""}</>}
            {" "}require{counts.Urgent + counts.Missing === 1 ? "s" : ""} your attention
          </p>
        </motion.div>
      )}

      {/* Task cards */}
      <div className="space-y-3">
        {mockTasks.map((task, i) => (
          <TaskCard key={task.id} task={task} index={i} />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task, index }: { task: any; index: number }) {
  const badge = BADGE_MAP[task.status] || BADGE_MAP["Pending"];
  const Icon = badge.icon;
  const isUrgent = task.status === "Urgent";
  const isDone = task.status === "Complete";

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16,1,0.3,1] }}
      className={`glass-card rounded-2xl overflow-hidden ${isUrgent ? "glow-red" : ""}`}
      style={{ border: `1px solid ${badge.border}` }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Status icon */}
            <div
              className="mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: badge.border, border: `1px solid ${badge.border}` }}
            >
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold leading-tight ${isDone ? "text-white/50 line-through" : "text-white"}`}>
                {task.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-1.5 items-center">
                <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                  Due {task.dueDate}
                </span>
                <span className="w-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
                <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {task.responsible}
                </span>
              </div>
            </div>
          </div>

          {/* Badge */}
          <span className={`${badge.cls} text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap`}>
            {task.status}
          </span>
        </div>

        {/* Action button */}
        {task.action !== "View" && !isDone && (
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <Link
              href={task.action === "Upload" ? "/uploads" : "/more"}
              className="shimmer-btn inline-flex items-center gap-1.5 text-xs font-bold tracking-wide px-4 py-2 rounded-xl"
              style={{
                background: isUrgent
                  ? "linear-gradient(135deg, rgba(239,68,68,0.25) 0%, rgba(220,38,38,0.35) 100%)"
                  : "linear-gradient(135deg, rgba(59,130,246,0.22) 0%, rgba(37,99,235,0.30) 100%)",
                border: isUrgent ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(59,130,246,0.35)",
                color: isUrgent ? "rgb(252,165,165)" : "rgb(147,197,253)",
              }}
            >
              {task.action === "Upload"
                ? <><UploadCloud style={{ width:14,height:14 }} /> Upload Now</>
                : <><Eye style={{ width:14,height:14 }} /> Track</>
              }
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
