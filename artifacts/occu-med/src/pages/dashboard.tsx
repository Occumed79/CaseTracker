import { applicantData } from "@/data/mockData";
import { motion } from "framer-motion";
import {
  FileText, MapPin, MessageSquare, PhoneCall, UploadCloud,
  CalendarClock, Clock, AlertTriangle, ChevronRight, TrendingUp,
  CheckCircle2, Circle, ArrowRight
} from "lucide-react";
import { Link } from "wouter";

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay } },
});

// Compact recent timeline for dashboard preview (Lawfully-style)
const RECENT_HISTORY = [
  { label: "RDQA Required", date: "Apr 28", state: "active" as const },
  { label: "Under SME Medical Review", date: "Apr 23", state: "done" as const },
  { label: "Results Received", date: "Apr 20", state: "done" as const },
  { label: "Appointment Attended", date: "Apr 15", state: "done" as const },
];

export default function Dashboard() {
  const pct = 58;

  return (
    <div className="px-4 pt-4 pb-8 space-y-5">
      {/* ── Case identity (Lawfully-style header) ── */}
      <motion.div variants={fade(0)} initial="hidden" animate="show">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold tracking-wide uppercase mb-1" style={{ color: "rgba(147,197,253,0.55)" }}>
              Case {applicantData.caseNumber}
            </p>
            <h1 className="text-[26px] font-bold text-white tracking-tight leading-tight">
              {applicantData.name}
            </h1>
            <p className="text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
              {applicantData.employer} · {applicantData.position}
            </p>
            <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.32)" }}>
              {applicantData.examType}
            </p>
          </div>
          <div
            className="rounded-2xl px-3.5 py-2.5 text-center flex-shrink-0"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.28)",
            }}
          >
            <span className="block text-[22px] font-bold leading-none" style={{ color: "rgb(252,211,77)" }}>12</span>
            <span className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: "rgba(252,211,77,0.65)" }}>Days left</span>
          </div>
        </div>
      </motion.div>

      {/* ── Current status card (hero — Lawfully status focus) ── */}
      <motion.div variants={fade(0.06)} initial="hidden" animate="show">
        <div
          className="rounded-[20px] p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(245,158,11,0.28)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="dot dot-amber" style={{ width: 8, height: 8 }} />
            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "rgba(252,211,77,0.8)" }}>
              Current Status
            </p>
          </div>

          <h2 className="text-[22px] font-bold text-white tracking-tight leading-snug mb-3">
            {applicantData.status}
          </h2>

          <p className="text-[13px] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.62)" }}>
            Additional medical information has been requested. Upload the required cardiology clearance letter and blood pressure log to continue review.
          </p>

          <div
            className="rounded-xl p-3 mb-4 flex items-start gap-2.5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <AlertTriangle style={{ width: 15, height: 15, color: "rgb(252,211,77)", flexShrink: 0, marginTop: 1 }} />
            <div>
              <p className="text-[12px] font-semibold text-white">Waiting on Applicant</p>
              <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                {applicantData.nextAction}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Case progress</span>
              <span className="text-[12px] font-bold" style={{ color: "rgba(147,197,253,0.9)" }}>{pct}%</span>
            </div>
            <div className="progress-track h-1.5">
              <div className="progress-fill" style={{ width: `${pct}%`, height: "100%" }} />
            </div>
          </div>

          <Link
            href="/uploads"
            className="w-full h-[46px] rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, hsl(217,100%,52%) 0%, hsl(200,100%,58%) 100%)",
              color: "hsl(224,50%,4%)",
              border: "1px solid rgba(59,130,246,0.3)",
            }}
          >
            <UploadCloud style={{ width: 17, height: 17 }} />
            Upload Required Documents
          </Link>
        </div>
      </motion.div>

      {/* ── Case Analysis strip (Lawfully-style insights) ── */}
      <motion.div variants={fade(0.1)} initial="hidden" animate="show">
        <p className="text-[11px] font-bold uppercase tracking-wider mb-2.5" style={{ color: "rgba(255,255,255,0.35)" }}>
          Case Insights
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Progress", value: `${pct}%`, sub: "milestones" },
            { label: "Priority", value: "High", sub: "RDQA active" },
            { label: "Next", value: "Upload", sub: "your action" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-3 text-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                {s.label}
              </p>
              <p className="text-[16px] font-bold text-white leading-none">{s.value}</p>
              <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Recent history (Lawfully timeline preview) ── */}
      <motion.div variants={fade(0.14)} initial="hidden" animate="show">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
            Case History
          </p>
          <Link href="/timeline" className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: "rgb(147,197,253)" }}>
            See all <ChevronRight style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        <div
          className="rounded-[20px] p-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="relative">
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px"
              style={{ background: "linear-gradient(180deg, rgba(59,130,246,0.45) 0%, rgba(255,255,255,0.08) 100%)" }}
            />
            <div className="space-y-3.5">
              {RECENT_HISTORY.map((ev) => (
                <div key={ev.label} className="flex gap-3 relative">
                  <div className="w-4 flex-shrink-0 flex justify-center pt-1">
                    {ev.state === "active" ? (
                      <div className="timeline-dot timeline-dot-active" style={{ width: 10, height: 10 }} />
                    ) : (
                      <div className="timeline-dot timeline-dot-done" style={{ width: 10, height: 10 }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
                    <p
                      className="text-[13px] font-medium leading-snug"
                      style={{ color: ev.state === "active" ? "rgb(147,197,253)" : "rgba(255,255,255,0.72)" }}
                    >
                      {ev.label}
                    </p>
                    <span className="text-[11px] flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {ev.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Quick actions ── */}
      <motion.div variants={fade(0.18)} initial="hidden" animate="show">
        <p className="text-[11px] font-bold uppercase tracking-wider mb-2.5" style={{ color: "rgba(255,255,255,0.35)" }}>
          Quick Actions
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { href: "/messages", icon: MessageSquare, label: "Message" },
            { href: "/eforms", icon: FileText, label: "eForms" },
            { href: "/map", icon: MapPin, label: "Clinic Map" },
            { href: "/appointment-request", icon: PhoneCall, label: "Request Call" },
            { href: "/extension-request", icon: CalendarClock, label: "Extension" },
            { href: "/timeline", icon: Clock, label: "Full Timeline" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-[16px] p-3.5 flex flex-col items-center gap-2 text-center card-hover"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.22)",
                }}
              >
                <Icon style={{ width: 16, height: 16, color: "rgb(147,197,253)" }} />
              </div>
              <span className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.72)" }}>
                {label}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Exam info strip ── */}
      <motion.div variants={fade(0.22)} initial="hidden" animate="show">
        <div
          className="rounded-[16px] p-4 flex items-center gap-3"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
            style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
          >
            <TrendingUp style={{ width: 17, height: 17, color: "rgb(147,197,253)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white">{applicantData.examType}</p>
            <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              {applicantData.employer} · {applicantData.position}
            </p>
          </div>
          <ChevronRight style={{ width: 16, height: 16, color: "rgba(255,255,255,0.25)" }} />
        </div>
      </motion.div>
    </div>
  );
}
