import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const [inviteCode, setInviteCode] = useState("");

  const handleApplicantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login("applicant");
  };

  return (
    <div className="min-h-[100dvh] aurora-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="orb orb-blue" style={{ width:400, height:400, top:"-120px", left:"-120px", opacity:0.65 }} />
      <div className="orb orb-indigo" style={{ width:300, height:300, bottom:"-80px", right:"-80px", opacity:0.55 }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Header branding */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-center mb-8"
        >
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4 glow-blue"
            style={{
              background: "rgba(255,255,255,0.09)",
              border: "1.5px solid rgba(59,130,246,0.4)",
              padding: "14px",
            }}
          >
            <img src="/occu-med-logo.png" alt="Occu-Med" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight text-glow-white">CaseTrack</h1>
          <p className="text-xs tracking-[0.18em] uppercase mt-1" style={{ color: "rgba(147,197,253,0.75)" }}>
            Applicant Portal
          </p>
        </motion.div>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="glass-card-elevated glass-reflection rounded-3xl p-6"
        >
          <form onSubmit={handleApplicantLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wider uppercase" style={{ color: "rgba(147,197,253,0.8)" }}>
                Invitation Code
              </label>
              <input
                type="text"
                placeholder="e.g. OM-ABCD-1234"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="glass-input w-full h-12 rounded-2xl px-4 text-sm font-medium"
              />
              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                Enter the code provided by your recruiter or HR contact.
              </p>
            </div>

            <button
              type="submit"
              className="shimmer-btn w-full h-12 rounded-2xl font-bold text-sm tracking-wide glow-blue"
              style={{
                background: "linear-gradient(135deg, hsl(217,100%,55%) 0%, hsl(210,100%,62%) 100%)",
                color: "hsl(222,47%,5%)",
                border: "1px solid rgba(59,130,246,0.4)",
              }}
            >
              Access My Case
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>
              Demo Access
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => login("applicant")}
              className="card-lift h-10 rounded-2xl text-xs font-semibold transition-all"
              style={{
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(59,130,246,0.25)",
                color: "rgb(147,197,253)",
              }}
            >
              👤 Applicant
            </button>
            <button
              onClick={() => login("admin")}
              className="card-lift h-10 rounded-2xl text-xs font-semibold transition-all"
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.25)",
                color: "rgb(196,181,253)",
              }}
            >
              🛡 Admin
            </button>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-[10px] mt-6"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          Secure · HIPAA-Aware · End-to-End Encrypted
        </motion.p>
      </motion.div>
    </div>
  );
}
