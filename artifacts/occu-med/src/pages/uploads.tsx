import { motion } from "framer-motion";
import { UploadCloud, File, AlertTriangle, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockUploads = [
  { id: 1, name: "Cardiology_Clearance_Letter.pdf", type: "Provider letter", status: "Under review", date: "Today" },
  { id: 2, name: "Blood_Pressure_Log_May.pdf", type: "BP log", status: "Needs correction", date: "Yesterday", warning: "Blurry/Unreadable" },
  { id: 3, name: "Vaccine_Records.jpeg", type: "Vaccine record", status: "Accepted", date: "May 1" }
];

export default function Uploads() {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Document Uploads</h1>
        <p className="text-muted-foreground text-sm">Securely submit required medical records.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card border border-primary/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-3 border-dashed bg-primary/5 hover:bg-primary/10 transition-colors"
      >
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center glow-blue text-primary">
          <UploadCloud className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-white font-medium">Tap to Upload File</h3>
          <p className="text-xs text-white/50 mt-1">PDF, JPEG, PNG • Max 20MB</p>
        </div>
        <Button className="mt-2 bg-white/10 hover:bg-white/20 text-white rounded-xl">Select File</Button>
      </motion.div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white/80 px-1">Uploaded Documents</h3>
        {mockUploads.map((doc, i) => (
          <DocCard key={doc.id} doc={doc} index={i} />
        ))}
      </div>
    </div>
  );
}

function DocCard({ doc, index }: { doc: any, index: number }) {
  let statusClass = "text-amber-400 bg-amber-400/10";
  let StatusIcon = File;
  
  if (doc.status === "Accepted") {
    statusClass = "text-emerald-400 bg-emerald-400/10";
    StatusIcon = CheckCircle2;
  } else if (doc.status === "Needs correction") {
    statusClass = "text-rose-400 bg-rose-400/10";
    StatusIcon = AlertTriangle;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + (index * 0.05) }}
      className={`glass-card p-4 rounded-2xl border ${doc.status === 'Needs correction' ? 'border-rose-500/30 glow-red' : 'border-white/5'}`}
    >
      <div className="flex gap-3">
        <div className={`p-2 rounded-lg shrink-0 ${statusClass}`}>
          <StatusIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white truncate">{doc.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] uppercase font-bold text-white/50">{doc.type}</span>
            <span className="text-[10px] text-white/30">• {doc.date}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${statusClass}`}>
              {doc.status}
            </span>
            {doc.warning && (
              <span className="text-[10px] text-rose-400 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {doc.warning}
              </span>
            )}
          </div>
        </div>
        <button className="text-white/30 hover:text-rose-400 transition-colors p-2 h-fit">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
