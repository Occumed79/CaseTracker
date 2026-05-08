import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const [code, setCode] = useState("");

  return (
    <div className="aurora-bg min-h-[100dvh] flex flex-col items-center justify-center p-5 relative overflow-hidden">
      <div className="orb orb-blue"   style={{width:420,height:420,top:"-130px",left:"-130px",opacity:0.7}} />
      <div className="orb orb-indigo" style={{width:320,height:320,bottom:"-90px",right:"-90px",opacity:0.6}} />

      <motion.div
        initial={{ opacity:0, y:36 }}
        animate={{ opacity:1, y:0  }}
        transition={{ duration:0.85, ease:[0.16,1,0.3,1] }}
        className="w-full max-w-[360px] relative z-10"
      >
        {/* Brand header */}
        <motion.div
          initial={{ opacity:0, y:-14 }}
          animate={{ opacity:1, y:0  }}
          transition={{ delay:0.15 }}
          className="flex flex-col items-center mb-8"
        >
          <div
            className="w-[76px] h-[76px] rounded-[22px] flex items-center justify-center glow-blue mb-4"
            style={{
              background:"linear-gradient(145deg,rgba(59,130,246,0.22) 0%,rgba(37,99,235,0.10) 100%)",
              border:"1.5px solid rgba(59,130,246,0.40)", padding:13,
            }}
          >
            <img src="/occu-med-logo.png" alt="Occu-Med" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-[26px] font-extrabold text-white tracking-tight leading-none text-glow-white">CaseTrack</h1>
          <p className="text-label mt-1.5" style={{ color:"rgba(147,197,253,0.72)" }}>Applicant Portal</p>
        </motion.div>

        {/* Glass card */}
        <motion.div
          initial={{ opacity:0, scale:0.95 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ delay:0.25, duration:0.65, ease:[0.16,1,0.3,1] }}
          className="glass-elevated glass-refract rounded-[28px] p-6"
        >
          <form onSubmit={e=>{e.preventDefault();login("applicant")}} className="space-y-4">
            <div>
              <label className="text-label mb-2 block" style={{ color:"rgba(147,197,253,0.75)" }}>
                Invitation Code
              </label>
              <input
                type="text"
                value={code}
                onChange={e=>setCode(e.target.value)}
                placeholder="e.g. OM-ABCD-1234"
                className="glass-input w-full h-[46px] px-4 text-sm font-medium"
              />
              <p className="text-caption mt-1.5" style={{ color:"rgba(255,255,255,0.30)" }}>
                Enter the code from your recruiter or HR contact.
              </p>
            </div>

            <button
              type="submit"
              className="shimmer-btn w-full h-[48px] rounded-[14px] font-bold text-[14px] tracking-wide glow-blue"
              style={{
                background:"linear-gradient(135deg,hsl(217,100%,52%) 0%,hsl(210,100%,60%) 100%)",
                color:"hsl(224,50%,4%)",
                border:"1px solid rgba(59,130,246,0.35)",
              }}
            >
              Access My Case
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background:"rgba(255,255,255,0.07)" }} />
            <span className="text-label" style={{ color:"rgba(255,255,255,0.25)", fontSize:9 }}>Demo Access</span>
            <div className="flex-1 h-px" style={{ background:"rgba(255,255,255,0.07)" }} />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label:"👤 Applicant", role:"applicant", color:"rgba(59,130,246,0.14)", border:"rgba(59,130,246,0.28)", text:"rgb(147,197,253)" },
              { label:"🛡 Admin",     role:"admin",     color:"rgba(139,92,246,0.14)", border:"rgba(139,92,246,0.28)", text:"rgb(196,181,253)" },
            ].map(b => (
              <button key={b.role} onClick={()=>login(b.role as any)}
                className="card-hover h-10 rounded-[12px] text-[12px] font-semibold"
                style={{ background:b.color, border:`1px solid ${b.border}`, color:b.text }}
              >{b.label}</button>
            ))}
          </div>
        </motion.div>

        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}
          className="text-center text-caption mt-5"
          style={{ color:"rgba(255,255,255,0.18)" }}
        >Secure · HIPAA-Aware · End-to-End Encrypted</motion.p>
      </motion.div>
    </div>
  );
}
