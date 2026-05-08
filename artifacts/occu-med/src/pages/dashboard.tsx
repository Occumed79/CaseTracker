import { applicantData } from "@/data/mockData";
import { motion } from "framer-motion";
import { FileText, MapPin, MessageSquare, PhoneCall, UploadCloud, CalendarClock, AlertCircle, TrendingUp, Clock } from "lucide-react";
import { Link } from "wouter";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } },
};

export default function Dashboard() {
  const progressPercent = 58;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="p-4 space-y-5 pb-8"
    >
      {/* ── Greeting ── */}
      <motion.div variants={fadeUp} className="pt-2">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(147,197,253,0.65)" }}>
          Welcome back
        </p>
        <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
          {applicantData.name.split(" ")[0]}
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
          {applicantData.employer} · {applicantData.position}
        </p>

        {/* Case badge */}
        <div
          className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.25)",
            color: "rgb(147,197,253)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-blue" />
          Case {applicantData.caseNumber}
        </div>
      </motion.div>

      {/* ── Progress card ── */}
      <motion.div variants={fadeUp}>
        <div
          className="glass-card glass-reflection rounded-3xl p-5 relative overflow-hidden"
          style={{ border: "1px solid rgba(59,130,246,0.20)" }}
        >
          {/* Blue ambient blob */}
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)", filter: "blur(20px)" }} />

          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "rgba(147,197,253,0.8)" }}>
              Case Progress
            </span>
            <span className="ml-auto text-sm font-bold" style={{ color: "rgb(147,197,253)" }}>
              {progressPercent}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full mb-1" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div className="h-2 progress-glow" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-[11px] mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>
            {applicantData.examType} · Pre-Employment Medical
          </p>
        </div>
      </motion.div>

      {/* ── Status card ── */}
      <motion.div variants={fadeUp}>
        <div
          className="glass-card glass-reflection rounded-3xl p-5 relative overflow-hidden"
          style={{ border: "1px solid rgba(245,158,11,0.22)" }}
        >
          {/* Amber ambient blob */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)", filter: "blur(20px)" }} />

          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(253,230,138,0.75)" }}>
                Current Status
              </p>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {applicantData.status}
                </h2>
                <span className="w-2 h-2 rounded-full bg-amber-400 pulse-amber" />
              </div>
            </div>
            {/* Days left */}
            <div
              className="rounded-2xl p-3 text-center glow-amber"
              style={{
                background: "rgba(245,158,11,0.15)",
                border: "1px solid rgba(245,158,11,0.35)",
                minWidth: 64,
              }}
            >
              <span className="block text-2xl font-black" style={{ color: "rgb(253,230,138)" }}>12</span>
              <span className="block text-[9px] font-bold tracking-widest uppercase" style={{ color: "rgba(253,230,138,0.65)" }}>
                Days Left
              </span>
            </div>
          </div>

          {/* Responsibility row */}
          <div
            className="rounded-2xl p-3.5 mb-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-3.5 h-3.5" style={{ color: "rgb(253,230,138)" }} />
              <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
                Responsibility: <span className="text-white">{applicantData.responsibility}</span>
              </span>
            </div>
            <p className="text-sm text-white/90 leading-snug">{applicantData.nextAction}</p>
          </div>

          {/* CTA */}
          <Link
            href="/uploads"
            className="shimmer-btn w-full flex items-center justify-center gap-2 h-12 rounded-2xl font-bold text-sm tracking-wide glow-blue"
            style={{
              background: "linear-gradient(135deg, hsl(217,100%,55%) 0%, hsl(200,100%,60%) 100%)",
              color: "hsl(222,47%,5%)",
              border: "1px solid rgba(59,130,246,0.4)",
              display: "flex",
            }}
          >
            <UploadCloud className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            Upload Required Documents
          </Link>
        </div>
      </motion.div>

      {/* ── Quick actions ── */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
            Quick Actions
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ActionCard href="/messages"            icon={MessageSquare} label="Message Case Manager" accent="blue" />
          <ActionCard href="/eforms"              icon={FileText}       label="View Forms"           accent="purple" />
          <ActionCard href="/map"                 icon={MapPin}         label="Find Clinic"          accent="emerald" />
          <ActionCard href="/appointment-request" icon={PhoneCall}      label="Request Call"         accent="orange" />
          <ActionCard href="/extension-request"   icon={CalendarClock}  label="Request Extension"   accent="rose" />
          <ActionCard href="/timeline"            icon={Clock}          label="Case Timeline"        accent="cyan" />
        </div>
      </motion.div>
    </motion.div>
  );
}

const ACCENT_COLORS: Record<string,{ bg:string; border:string; icon:string; glow:string }> = {
  blue:    { bg:"rgba(59,130,246,0.12)",  border:"rgba(59,130,246,0.22)",  icon:"rgb(147,197,253)", glow:"0 0 16px rgba(59,130,246,0.3)" },
  purple:  { bg:"rgba(139,92,246,0.12)", border:"rgba(139,92,246,0.22)", icon:"rgb(196,181,253)", glow:"0 0 16px rgba(139,92,246,0.3)" },
  emerald: { bg:"rgba(16,185,129,0.12)", border:"rgba(16,185,129,0.22)", icon:"rgb(110,231,183)", glow:"0 0 16px rgba(16,185,129,0.3)" },
  orange:  { bg:"rgba(249,115,22,0.12)", border:"rgba(249,115,22,0.22)", icon:"rgb(253,186,116)", glow:"0 0 16px rgba(249,115,22,0.3)" },
  rose:    { bg:"rgba(244,63,94,0.12)",  border:"rgba(244,63,94,0.22)",  icon:"rgb(253,164,175)", glow:"0 0 16px rgba(244,63,94,0.3)" },
  cyan:    { bg:"rgba(6,182,212,0.12)",  border:"rgba(6,182,212,0.22)",  icon:"rgb(103,232,249)", glow:"0 0 16px rgba(6,182,212,0.3)" },
};

function ActionCard({ href, icon: Icon, label, accent }: { href:string; icon:any; label:string; accent:string }) {
  const c = ACCENT_COLORS[accent] || ACCENT_COLORS.blue;
  return (
    <Link
      href={href}
      className="card-lift glass-card rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 text-center"
      style={{ minHeight: 100 }}
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center"
        style={{ background: c.bg, border: `1px solid ${c.border}`, boxShadow: c.glow }}
      >
        <Icon className="w-5 h-5" style={{ color: c.icon, width: 20, height: 20 }} />
      </div>
      <span className="text-xs font-semibold leading-snug" style={{ color: "rgba(255,255,255,0.82)" }}>
        {label}
      </span>
    </Link>
  );
}
