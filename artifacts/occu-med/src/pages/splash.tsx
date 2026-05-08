import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Splash() {
  const [, setLocation] = useLocation();
  useEffect(() => { const t = setTimeout(() => setLocation("/login"), 3200); return () => clearTimeout(t); }, []);

  return (
    <div className="aurora-bg min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="orb orb-blue"   style={{width:380,height:380,top:"-100px",left:"-100px"}} />
      <div className="orb orb-indigo" style={{width:300,height:300,bottom:"-80px",right:"-60px"}} />
      <div className="orb orb-cyan orb-sm" style={{width:200,height:200,top:"55%",left:"65%",opacity:0.5}} />

      <motion.div
        initial={{ opacity:0, scale:0.7, y:40 }}
        animate={{ opacity:1, scale:1,   y:0  }}
        transition={{ duration:1.0, ease:[0.16,1,0.3,1] }}
        className="glass-elevated glass-refract rounded-[32px] flex flex-col items-center px-12 py-14 relative z-10"
        style={{ minWidth:300 }}
      >
        <motion.div
          initial={{ scale:0.5, opacity:0 }}
          animate={{ scale:1,   opacity:1 }}
          transition={{ delay:0.25, duration:0.8, ease:[0.16,1,0.3,1] }}
          className="w-[88px] h-[88px] rounded-[22px] mb-7 flex items-center justify-center glow-blue"
          style={{
            background:"linear-gradient(145deg,rgba(59,130,246,0.24) 0%,rgba(37,99,235,0.12) 100%)",
            border:"1.5px solid rgba(59,130,246,0.42)", padding:14,
          }}
        >
          <img src="/occu-med-logo.png" alt="Occu-Med" className="w-full h-full object-contain" />
        </motion.div>

        <motion.h1
          initial={{ opacity:0, y:12 }}
          animate={{ opacity:1, y:0  }}
          transition={{ delay:0.5, duration:0.6 }}
          className="text-[28px] font-extrabold text-white tracking-tight leading-none mb-1 text-glow-white"
        >CaseTrack</motion.h1>

        <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:0.65 }}
          className="text-label mb-0.5"
          style={{ color:"rgba(147,197,253,0.75)" }}
        >by Occu-Med</motion.p>

        <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:0.8 }}
          className="text-caption text-center mt-2"
          style={{ color:"rgba(255,255,255,0.32)" }}
        >Medical Readiness Platform</motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1.4 }}
        className="absolute bottom-20 flex flex-col items-center gap-3 z-10"
      >
        <div className="flex gap-2">
          {[0,0.18,0.36].map((d,i) => (
            <motion.div key={i}
              className="w-[6px] h-[6px] rounded-full"
              style={{ background:"rgba(147,197,253,0.6)", boxShadow:"0 0 6px rgba(59,130,246,0.5)" }}
              animate={{ opacity:[0.3,1,0.3], scale:[0.7,1.3,0.7] }}
              transition={{ duration:1.4, repeat:Infinity, delay:d, ease:"easeInOut" }}
            />
          ))}
        </div>
        <span className="text-label" style={{ color:"rgba(255,255,255,0.22)", fontSize:9 }}>Loading</span>
      </motion.div>
    </div>
  );
}
