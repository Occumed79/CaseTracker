import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, ShieldCheck } from "lucide-react";

const INIT = [
  { id:1, text:"Hi Alex, we've reviewed your initial medical packet. The reviewing physician has requested additional information regarding your cardiology history.", sender:"admin",     time:"10:00 AM", date:"May 10" },
  { id:2, text:"Okay, what specifically do they need?",                                                                                                              sender:"applicant", time:"10:15 AM", date:"May 10" },
  { id:3, text:"They need a clearance letter from your cardiologist stating no restrictions, plus your last 30 days of blood pressure logs. Upload them in the Uploads tab.", sender:"admin", time:"10:20 AM", date:"May 10" },
];

export default function Messages() {
  const { role } = useAuth();
  const [msgs, setMsgs] = useState(INIT);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMsgs(m => [...m, { id:Date.now(), text, sender:role as string, time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}), date:"Today" }]);
    setText("");
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-54px-80px)]">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
        style={{background:"rgba(6,10,24,0.6)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{background:"rgba(59,130,246,0.14)",border:"1px solid rgba(59,130,246,0.28)"}}>
          <img src="/occu-med-logo.png" alt="CM" className="w-5 h-5 object-contain"/>
        </div>
        <div>
          <p className="text-[14px] font-bold text-white leading-tight">
            {role==="applicant"?"Morgan — Case Manager":"Alex — Applicant"}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="dot dot-green" style={{width:6,height:6}}/>
            <span className="text-caption" style={{color:"rgb(110,231,183)"}}>Online</span>
          </div>
        </div>
        <div className="ml-auto">
          <span className="badge badge-complete"><ShieldCheck style={{width:9,height:9}}/> Encrypted</span>
        </div>
      </div>

      {/* Message thread */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="text-center">
          <span className="text-label px-3 py-1 rounded-full" style={{background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.35)",fontSize:9}}>May 10, 2026</span>
        </div>

        <AnimatePresence>
          {msgs.map((msg) => {
            const isMe = msg.sender === role;
            return (
              <motion.div key={msg.id}
                initial={{opacity:0, y:10, scale:0.97}}
                animate={{opacity:1, y:0,  scale:1 }}
                transition={{duration:0.3, ease:[0.16,1,0.3,1]}}
                className={`flex gap-2.5 ${isMe?"flex-row-reverse":"flex-row"}`}
              >
                {!isMe && (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 self-end mb-1"
                    style={{background:"rgba(59,130,246,0.14)",border:"1px solid rgba(59,130,246,0.25)"}}>
                    <img src="/occu-med-logo.png" className="w-4.5 h-4.5 object-contain" alt="" style={{width:18,height:18}}/>
                  </div>
                )}
                <div className={`flex flex-col max-w-[72%] ${isMe?"items-end":"items-start"}`}>
                  <div
                    className="px-4 py-2.5 text-[13.5px] leading-relaxed"
                    style={{
                      borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: isMe
                        ? "linear-gradient(135deg,hsl(217,100%,52%) 0%,hsl(210,100%,58%) 100%)"
                        : "rgba(255,255,255,0.07)",
                      border: isMe
                        ? "1px solid rgba(59,130,246,0.35)"
                        : "1px solid rgba(255,255,255,0.09)",
                      color: isMe ? "hsl(224,50%,4%)" : "rgba(255,255,255,0.88)",
                      boxShadow: isMe
                        ? "0 4px 16px rgba(37,99,235,0.35), 0 0 24px rgba(59,130,246,0.20)"
                        : "0 4px 16px rgba(0,0,0,0.30)",
                      backdropFilter: isMe ? "none" : "blur(12px)",
                    }}
                  >{msg.text}</div>
                  <span className="text-caption mt-1 px-1" style={{color:"rgba(255,255,255,0.28)"}}>{msg.time}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={endRef}/>
      </div>

      {/* Input bar — floating glass */}
      <div className="flex-shrink-0 px-4 pb-2 pt-2"
        style={{background:"rgba(6,10,24,0.70)",backdropFilter:"blur(28px)",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
        <form onSubmit={send} className="flex items-center gap-2.5">
          <button type="button"
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all"
            style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.09)"}}>
            <Paperclip style={{width:16,height:16,color:"rgba(255,255,255,0.45)"}}/>
          </button>
          <input
            value={text}
            onChange={e=>setText(e.target.value)}
            placeholder="Message…"
            className="glass-input flex-1 h-10 px-4 text-[13.5px]"
            style={{borderRadius:"22px"}}
          />
          <motion.button type="submit" whileTap={{scale:0.88}}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 glow-blue shimmer-btn"
            style={{
              background:"linear-gradient(135deg,hsl(217,100%,52%) 0%,hsl(200,100%,60%) 100%)",
              border:"1px solid rgba(59,130,246,0.35)",
            }}>
            <Send style={{width:15,height:15,color:"hsl(224,50%,4%)"}}/>
          </motion.button>
        </form>
      </div>
    </div>
  );
}
