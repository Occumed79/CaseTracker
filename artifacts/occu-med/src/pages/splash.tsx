import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLocation("/login"), 3000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-[100dvh] aurora-bg flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="orb orb-blue" style={{ width:320, height:320, top:"-80px", left:"-80px", opacity:0.7 }} />
      <div className="orb orb-indigo" style={{ width:280, height:280, bottom:"-60px", right:"-60px", opacity:0.6 }} />
      <div className="orb orb-cyan" style={{ width:200, height:200, top:"40%", left:"60%", opacity:0.4 }} />

      {/* Logo card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card-elevated glass-reflection rounded-3xl px-10 py-12 flex flex-col items-center relative z-10"
        style={{ minWidth: 280 }}
      >
        {/* Glowing logo badge */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-24 rounded-3xl mb-6 flex items-center justify-center glow-blue"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "1.5px solid rgba(59,130,246,0.45)",
            padding: "12px",
          }}
        >
          <img src="/occu-med-logo.png" alt="Occu-Med" className="w-full h-full object-contain" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-2xl font-bold text-white tracking-tight mb-1 text-glow-white"
        >
          CaseTrack
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-1"
          style={{ color: "rgba(147,197,253,0.85)" }}
        >
          by Occu-Med
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="text-xs text-center mt-1"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          Medical Readiness Platform
        </motion.p>
      </motion.div>

      {/* Loading ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-16 flex flex-col items-center gap-3 z-10"
      >
        {/* Animated dots */}
        <div className="flex gap-1.5">
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay }}
              style={{ boxShadow: "0 0 6px rgba(59,130,246,0.6)" }}
            />
          ))}
        </div>
        <p className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
          Loading
        </p>
      </motion.div>
    </div>
  );
}
