import { motion } from "framer-motion";
import { Link } from "wouter";
import { UploadCloud } from "lucide-react";

const EVENTS = [
  {
    id: 1,
    label: "Referral Received",
    date: "Apr 10, 2026",
    state: "done" as const,
    desc: "Your employer submitted a medical readiness referral to Occu-Med.",
  },
  {
    id: 2,
    label: "Scheduling in Progress",
    date: "Apr 11, 2026",
    state: "done" as const,
    desc: "Clinic options were reviewed and an appointment window was coordinated.",
  },
  {
    id: 3,
    label: "Appointment Scheduled",
    date: "Apr 13, 2026",
    state: "done" as const,
    desc: "Your occupational health exam was scheduled at a preferred clinic.",
  },
  {
    id: 4,
    label: "Authorization Sent",
    date: "Apr 14, 2026",
    state: "done" as const,
    desc: "Authorization packet was sent to the clinic and to you.",
  },
  {
    id: 5,
    label: "Appointment Attended",
    date: "Apr 15, 2026",
    state: "done" as const,
    desc: "Physical exam and baseline testing were completed.",
  },
  {
    id: 6,
    label: "Results Pending",
    date: "Apr 17, 2026",
    state: "done" as const,
    desc: "Lab and clinic results were awaiting return to Occu-Med.",
  },
  {
    id: 7,
    label: "Results Received",
    date: "Apr 20, 2026",
    state: "done" as const,
    desc: "Clinic results arrived and were entered into your case file.",
  },
  {
    id: 8,
    label: "Under SME Medical Review",
    date: "Apr 23, 2026",
    state: "done" as const,
    desc: "A medical reviewer evaluated your findings against job requirements.",
  },
  {
    id: 9,
    label: "RDQA Required",
    date: "Apr 28, 2026",
    state: "active" as const,
    desc: "Additional information is needed (cardiology clearance and blood pressure log). This is a common next step when findings require clarification.",
  },
  {
    id: 10,
    label: "Additional Info Requested",
    date: "Apr 28, 2026",
    state: "active" as const,
    desc: "You were asked to upload specific documents. Deadline is in 12 days.",
  },
  {
    id: 11,
    label: "Additional Info Submitted",
    date: null,
    state: "pending" as const,
    desc: "After you upload the requested records, this step will complete.",
  },
  {
    id: 12,
    label: "Final Recommendation Pending",
    date: null,
    state: "pending" as const,
    desc: "Once documents are reviewed, Occu-Med will issue a clearance recommendation.",
  },
  {
    id: 13,
    label: "Cleared / Determination",
    date: null,
    state: "pending" as const,
    desc: "Final medical readiness determination (cleared, accommodation, or waiver path).",
  },
];

export default function Timeline() {
  const done = EVENTS.filter((e) => e.state === "done").length;
  const total = EVENTS.length;
  const pct = Math.round((done / total) * 100);
  const active = EVENTS.find((e) => e.state === "active");

  return (
    <div className="px-4 pt-4 pb-8 space-y-5">
      <div className="pt-1">
        <p className="text-[11px] font-semibold tracking-wide uppercase mb-1" style={{ color: "rgba(147,197,253,0.55)" }}>
          Case OM-2026-0148
        </p>
        <h1 className="text-[26px] font-bold text-white tracking-tight leading-none">Case History</h1>
        <p className="text-[13px] mt-1.5" style={{ color: "rgba(255,255,255,0.42)" }}>
          Every status update on your medical readiness case, in order.
        </p>
      </div>

      {/* Progress — dual glass */}
      <div className="glass-card glass-dual rounded-[18px] p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
            Steps completed
          </span>
          <span className="text-[18px] font-bold" style={{ color: "rgb(147,197,253)" }}>
            {done}
            <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>/{total}</span>
          </span>
        </div>
        <div className="progress-track h-1.5 mb-2">
          <div className="progress-fill" style={{ width: `${pct}%`, height: "100%" }} />
        </div>
        <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.38)" }}>
          {pct}% of case milestones reached
        </p>
      </div>

      {/* Current step callout */}
      {active && (
        <div className="glass-elevated glass-refract glass-dual-amber rounded-[18px] p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="dot dot-amber" style={{ width: 7, height: 7 }} />
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "rgba(252,211,77,0.85)" }}>
              Current step
            </span>
          </div>
          <p className="text-[15px] font-semibold text-white">{active.label}</p>
          <p className="text-[12px] mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            {active.desc}
          </p>
          <Link
            href="/uploads"
            className="mt-3 inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[12px] font-semibold glass-card glass-dual-blue"
            style={{ color: "rgb(147,197,253)" }}
          >
            <UploadCloud style={{ width: 13, height: 13 }} />
            Upload documents
          </Link>
        </div>
      )}

      {/* Full timeline */}
      <div className="relative">
        <div
          className="absolute left-[15px] top-3 bottom-3 w-px"
          style={{
            background: "linear-gradient(180deg, rgba(16,185,129,0.45) 0%, rgba(59,130,246,0.35) 40%, rgba(255,255,255,0.06) 85%)",
          }}
        />

        <div className="space-y-0">
          {EVENTS.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-3.5 relative py-2.5"
            >
              <div className="flex-shrink-0 w-8 flex items-start justify-center pt-0.5">
                <div
                  className={
                    ev.state === "done"
                      ? "timeline-dot timeline-dot-done"
                      : ev.state === "active"
                        ? "timeline-dot timeline-dot-active"
                        : "timeline-dot timeline-dot-pending"
                  }
                />
              </div>

              <div
                className={
                  ev.state === "active"
                    ? "flex-1 min-w-0 glass-card glass-dual-blue rounded-xl px-3.5 py-3"
                    : ev.state === "done"
                      ? "flex-1 min-w-0 glass-card glass-dual rounded-xl px-3.5 py-3"
                      : "flex-1 min-w-0 rounded-xl px-3.5 py-3"
                }
                style={ev.state === "pending" ? { border: "1px solid transparent" } : undefined}
              >
                <div className="flex items-start justify-between gap-2">
                  <p
                    className="text-[13.5px] font-semibold leading-snug"
                    style={{
                      color:
                        ev.state === "pending"
                          ? "rgba(255,255,255,0.32)"
                          : ev.state === "active"
                            ? "rgb(147,197,253)"
                            : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {ev.label}
                  </p>
                  {ev.state === "active" && (
                    <span className="badge badge-urgent" style={{ fontSize: 8 }}>
                      Active
                    </span>
                  )}
                </div>
                {ev.date && (
                  <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {ev.date}
                  </p>
                )}
                <p
                  className="text-[12px] mt-1.5 leading-relaxed"
                  style={{
                    color:
                      ev.state === "pending"
                        ? "rgba(255,255,255,0.25)"
                        : "rgba(255,255,255,0.48)",
                  }}
                >
                  {ev.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
