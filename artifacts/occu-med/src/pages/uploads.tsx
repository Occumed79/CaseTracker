import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, AlertTriangle, ChevronRight } from "lucide-react";

const DOCS = [
  { id: 1, name: "Cardiology_Clearance_Letter.pdf", type: "Provider Letter", status: "Under Review", date: "Today", size: "2.4 MB" },
  { id: 2, name: "Blood_Pressure_Log_May.pdf", type: "BP Log", status: "Needs Correction", date: "Yesterday", size: "1.1 MB", warning: "Blurry/Unreadable" },
  { id: 3, name: "Vaccine_Records.jpeg", type: "Vaccine Record", status: "Accepted", date: "May 1", size: "3.8 MB" },
];
const CATS = [
  "Provider Letter",
  "Specialist Clearance",
  "Lab Results",
  "Imaging",
  "Vaccine Record",
  "CPAP Compliance",
  "BP Log",
  "Waiver Docs",
  "Appeal Docs",
  "Other",
];

const STAT: Record<string, { badge: string; dual: string }> = {
  "Under Review": { badge: "badge-pending", dual: "glass-dual-blue" },
  "Needs Correction": { badge: "badge-urgent", dual: "glass-dual-amber" },
  Accepted: { badge: "badge-complete", dual: "glass-dual" },
};

export default function Uploads() {
  const [dragging, setDragging] = useState(false);

  return (
    <div className="px-4 pt-4 pb-8 space-y-5">
      <div className="pt-1">
        <p className="text-[11px] font-semibold tracking-wide uppercase mb-1" style={{ color: "rgba(147,197,253,0.55)" }}>
          Document Center
        </p>
        <h1 className="text-[26px] font-bold text-white tracking-tight leading-none">Uploads</h1>
        <p className="text-[13px] mt-1.5" style={{ color: "rgba(255,255,255,0.42)" }}>
          Securely submit required medical records.
        </p>
      </div>

      {/* Upload zone — elevated dual glass */}
      <motion.div
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDrop={() => setDragging(false)}
        animate={dragging ? { scale: 1.015 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`glass-elevated glass-refract rounded-[24px] p-8 flex flex-col items-center text-center relative overflow-hidden ${
          dragging ? "glass-dual-blue" : "glass-dual"
        }`}
      >
        <div className="relative mb-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(145deg,rgba(59,130,246,0.22) 0%,rgba(37,99,235,0.12) 100%)",
              border: "1px solid rgba(59,130,246,0.35)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 20px rgba(59,130,246,0.25)",
            }}
          >
            <UploadCloud style={{ width: 28, height: 28, color: "rgb(147,197,253)" }} />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full border border-blue-400/30"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </div>

        <h3 className="text-[16px] font-bold text-white mb-1">Drop files here or tap to upload</h3>
        <p className="text-[12px] mb-5" style={{ color: "rgba(255,255,255,0.38)" }}>
          PDF, JPEG, PNG · Max 20 MB
        </p>

        <div className="w-full mb-4">
          <select className="glass-input w-full h-11 px-3 text-[13px] font-medium appearance-none" style={{ paddingRight: "2.5rem" }}>
            <option value="">Select document type…</option>
            {CATS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          className="shimmer-btn h-10 px-6 rounded-2xl font-bold text-[13px]"
          style={{
            background: "linear-gradient(135deg,hsl(217,100%,52%) 0%,hsl(200,100%,60%) 100%)",
            color: "hsl(224,50%,4%)",
            border: "1px solid rgba(59,130,246,0.35)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
          }}
        >
          Select File
        </button>
      </motion.div>

      <div className="glass-card glass-dual-amber rounded-[18px] p-4 flex items-start gap-3">
        <AlertTriangle style={{ width: 16, height: 16, color: "rgb(252,211,77)", flexShrink: 0, marginTop: 1 }} />
        <div>
          <p className="text-[12px] font-bold text-white mb-0.5">AI Document Check</p>
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.48)" }}>
            Uploaded files are automatically scanned for legibility, completeness, and required signatures.
          </p>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
          Uploaded Documents
        </p>
        <div className="space-y-2.5">
          <AnimatePresence>
            {DOCS.map((doc, i) => {
              const st = STAT[doc.status] || STAT["Under Review"];
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`glass-card ${st.dual} rounded-[18px] p-4 card-hover`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
                      }}
                    >
                      <FileText style={{ width: 18, height: 18, color: "rgba(255,255,255,0.6)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-white truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-[10px] font-semibold uppercase" style={{ color: "rgba(255,255,255,0.38)" }}>
                          {doc.type}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9 }}>·</span>
                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.30)" }}>
                          {doc.size}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9 }}>·</span>
                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.30)" }}>
                          {doc.date}
                        </span>
                      </div>
                      {doc.warning && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertTriangle style={{ width: 10, height: 10, color: "rgb(252,165,165)" }} />
                          <span className="text-[11px]" style={{ color: "rgb(252,165,165)" }}>
                            {doc.warning}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`badge ${st.badge}`}>{doc.status}</span>
                      <ChevronRight style={{ width: 14, height: 14, color: "rgba(255,255,255,0.25)" }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
