import { mockTasks } from "@/data/mockData";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle, UploadCloud, XCircle, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

const STATUS: Record<string, { badge: string; dot: string; icon: any; dual: string }> = {
  Complete: { badge: "badge-complete", dot: "dot-green", icon: CheckCircle2, dual: "glass-dual" },
  Pending: { badge: "badge-pending", dot: "dot-blue", icon: Clock, dual: "glass-dual-blue" },
  Missing: { badge: "badge-missing", dot: "dot-amber", icon: AlertCircle, dual: "glass-dual-amber" },
  Urgent: { badge: "badge-urgent", dot: "dot-red", icon: AlertCircle, dual: "glass-dual-amber" },
  "Needs Correction": { badge: "badge-correction", dot: "dot-purple", icon: XCircle, dual: "glass-dual" },
};

export default function Tasks() {
  const urgent = mockTasks.filter((t) => t.status === "Urgent").length;
  const missing = mockTasks.filter((t) => t.status === "Missing").length;
  const complete = mockTasks.filter((t) => t.status === "Complete").length;

  return (
    <div className="px-4 pt-4 pb-8 space-y-5">
      <div className="pt-1">
        <p className="text-[11px] font-semibold tracking-wide uppercase mb-1" style={{ color: "rgba(147,197,253,0.55)" }}>
          Your Checklist
        </p>
        <h1 className="text-[26px] font-bold text-white tracking-tight leading-none">Tasks</h1>
        <p className="text-[13px] mt-1.5" style={{ color: "rgba(255,255,255,0.42)" }}>
          What still needs action on your medical readiness case.
        </p>
      </div>

      {/* Summary tiles — dual glass */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Urgent", value: urgent, dot: "dot-red", dual: "glass-dual-amber" },
          { label: "Missing", value: missing, dot: "dot-amber", dual: "glass-dual-amber" },
          { label: "Complete", value: complete, dot: "dot-green", dual: "glass-dual" },
        ].map((s) => (
          <div key={s.label} className={`glass-card ${s.dual} rounded-2xl p-3 flex flex-col items-center gap-1`}>
            <span className={`dot ${s.dot}`} style={{ width: 7, height: 7 }} />
            <span className="text-[22px] font-bold text-white leading-none">{s.value}</span>
            <span className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {(urgent > 0 || missing > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card glass-dual-amber rounded-2xl p-3.5 flex items-center gap-2.5"
        >
          <AlertCircle style={{ width: 15, height: 15, color: "rgb(252,165,165)", flexShrink: 0 }} />
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.75)" }}>
            <span className="font-bold" style={{ color: "rgb(252,165,165)" }}>
              {urgent} urgent
            </span>
            {missing > 0 && (
              <>
                {" "}and{" "}
                <span className="font-bold" style={{ color: "rgb(252,211,77)" }}>
                  {missing} missing
                </span>
              </>
            )}
            {" "}
            item{urgent + missing !== 1 ? "s" : ""} need your attention
          </p>
        </motion.div>
      )}

      <div className="space-y-2.5">
        {mockTasks.map((task, i) => (
          <TaskRow key={task.id} task={task} index={i} />
        ))}
      </div>
    </div>
  );
}

function TaskRow({ task, index }: { task: any; index: number }) {
  const [open, setOpen] = useState(false);
  const s = STATUS[task.status] || STATUS["Pending"];
  const Icon = s.icon;
  const isDone = task.status === "Complete";
  const isUrgent = task.status === "Urgent";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-card ${s.dual} rounded-[20px] overflow-hidden`}
    >
      <div className="p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <Icon style={{ width: 15, height: 15 }} />
          </div>

          <div className="flex-1 min-w-0">
            <p className={`text-[14px] font-semibold leading-snug ${isDone ? "text-white/40 line-through" : "text-white"}`}>
              {task.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                Due {task.dueDate}
              </span>
              <span className="w-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
              <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                {task.responsible}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`badge ${s.badge}`}>{task.status}</span>
            <ChevronDown
              style={{
                width: 14,
                height: 14,
                color: "rgba(255,255,255,0.3)",
                transform: open ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
          </div>
        </div>
      </div>

      {open && !isDone && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="px-4 pb-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="pt-3 flex gap-2 flex-wrap">
            <Link
              href={task.action === "Upload" ? "/uploads" : "/more"}
              className="shimmer-btn inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[12px] font-bold"
              style={{
                background: isUrgent
                  ? "linear-gradient(135deg,rgba(239,68,68,0.22) 0%,rgba(220,38,38,0.32) 100%)"
                  : "linear-gradient(135deg,rgba(59,130,246,0.20) 0%,rgba(37,99,235,0.28) 100%)",
                border: isUrgent ? "1px solid rgba(239,68,68,0.38)" : "1px solid rgba(59,130,246,0.32)",
                color: isUrgent ? "rgb(252,165,165)" : "rgb(147,197,253)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              {task.action === "Upload" ? (
                <>
                  <UploadCloud style={{ width: 13, height: 13 }} />
                  Upload Now
                </>
              ) : (
                <>View Details</>
              )}
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
