import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, ShieldCheck } from "lucide-react";

const INIT = [
  {
    id: 1,
    text: "Hi Alex, we've reviewed your initial medical packet. The reviewing physician has requested additional information regarding your cardiology history.",
    sender: "admin",
    time: "10:00 AM",
    date: "May 10",
  },
  {
    id: 2,
    text: "Okay, what specifically do they need?",
    sender: "applicant",
    time: "10:15 AM",
    date: "May 10",
  },
  {
    id: 3,
    text: "They need a clearance letter from your cardiologist stating no restrictions, plus your last 30 days of blood pressure logs. Upload them in the Uploads tab.",
    sender: "admin",
    time: "10:20 AM",
    date: "May 10",
  },
];

export default function Messages() {
  const { role } = useAuth();
  const [msgs, setMsgs] = useState(INIT);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMsgs((m) => [
      ...m,
      {
        id: Date.now(),
        text,
        sender: role as string,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        date: "Today",
      },
    ]);
    setText("");
  };

  return (
    <div className="messages-workspace flex flex-col">
      {/* Header — glass dual */}
      <div
        className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
        style={{
          background: "var(--surface)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(var(--ink-rgb),0.08)",
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(59,130,246,0.14)",
            border: "1px solid rgba(59,130,246,0.28)",
          }}
        >
          <img src="/occu-med-logo.png" alt="CM" className="w-5 h-5 object-contain" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-foreground leading-tight">
            {role === "applicant" ? "Morgan — Case Manager" : "Alex — Applicant"}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="dot dot-green" style={{ width: 6, height: 6 }} />
            <span className="text-[11px]" style={{ color: "var(--system-green)" }}>
              Online
            </span>
          </div>
        </div>
        <div className="ml-auto">
          <span className="badge badge-complete">
            <ShieldCheck style={{ width: 9, height: 9 }} /> Encrypted
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="text-center">
          <span
            className="text-[9px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full"
            style={{ background: "rgba(var(--ink-rgb),0.06)", color: "var(--text-secondary)", border: "1px solid rgba(var(--ink-rgb),0.08)" }}
          >
            May 10, 2026
          </span>
        </div>

        <AnimatePresence>
          {msgs.map((msg) => {
            const isMe = msg.sender === role;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`flex gap-2.5 ${isMe ? "flex-row-reverse" : "flex-row"}`}
              >
                {!isMe && (
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 self-end mb-1"
                    style={{
                      background: "rgba(59,130,246,0.14)",
                      border: "1px solid rgba(59,130,246,0.25)",
                    }}
                  >
                    <img src="/occu-med-logo.png" className="object-contain" alt="" style={{ width: 18, height: 18 }} />
                  </div>
                )}
                <div className={`flex flex-col max-w-[72%] ${isMe ? "items-end" : "items-start"}`}>
                  <div
                    className="px-4 py-2.5 text-[13.5px] leading-relaxed"
                    style={{
                      borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: isMe
                        ? "var(--system-blue)"
                        : "linear-gradient(155deg, rgba(var(--ink-rgb),0.10) 0%, rgba(var(--ink-rgb),0.05) 100%)",
                      border: isMe ? "1px solid rgba(59,130,246,0.40)" : "1px solid rgba(var(--ink-rgb),0.14)",
                      color: isMe ? "var(--on-accent)" : "rgba(var(--ink-rgb),0.88)",

                      backdropFilter: isMe ? "none" : "blur(16px)",
                    }}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[11px] mt-1 px-1" style={{ color: "var(--text-secondary)" }}>
                    {msg.time}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Input bar */}
      <div
        className="flex-shrink-0 px-4 pb-2 pt-2"
        style={{
          background: "var(--surface)",
          backdropFilter: "blur(28px)",
          borderTop: "1px solid rgba(var(--ink-rgb),0.08)",
        }}
      >
        <form onSubmit={send} className="flex items-center gap-2.5">
          <button
            type="button"
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(var(--ink-rgb),0.06)",
              border: "1px solid rgba(var(--ink-rgb),0.12)",
            }}
          >
            <Paperclip style={{ width: 16, height: 16, color: "var(--text-secondary)" }} />
          </button>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Message"
            placeholder="Message…"
            className="glass-input flex-1 min-w-0 h-10 px-4 text-[13.5px]"
            style={{ borderRadius: "22px" }}
          />
          <motion.button
            type="submit"
            aria-label="Send message"
            whileTap={{ scale: 0.88 }}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shimmer-btn"
            style={{
              background: "linear-gradient(135deg,hsl(217,100%,52%) 0%,hsl(200,100%,60%) 100%)",
              border: "1px solid rgba(59,130,246,0.35)",
            }}
          >
            <Send style={{ width: 15, height: 15, color: "var(--on-accent)" }} />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
