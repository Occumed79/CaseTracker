import { motion } from "framer-motion";
import { FolderHeart, File, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockRecords = [
  { id: 1, name: "Physical Exam Report", date: "Apr 15, 2026", type: "Clinical", secure: true },
  { id: 2, name: "Comprehensive Lab Panel", date: "Apr 16, 2026", type: "Labs", secure: true },
  { id: 3, name: "Audiogram Results", date: "Apr 15, 2026", type: "Testing", secure: true },
  { id: 4, name: "COVID-19 Vaccination Record", date: "Jan 10, 2024", type: "Immunization", secure: false },
];

export default function Vault() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Medical Vault</h1>
        <p className="text-muted-foreground text-sm">Secure storage for your health records.</p>
      </div>

      <div className="glass-card rounded-2xl p-4 flex items-center justify-between border border-emerald-500/20 bg-emerald-500/5">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <div>
            <h3 className="text-sm font-semibold text-white">Encrypted Storage</h3>
            <p className="text-xs text-white/60">HIPAA Compliant</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {mockRecords.map((record, i) => (
          <motion.div 
            key={record.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 rounded-2xl border border-white/5 flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary mb-2">
              <File className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white line-clamp-2 mb-1">{record.name}</h4>
              <p className="text-[10px] text-white/40">{record.date}</p>
            </div>
            <div className="mt-auto pt-3 flex justify-between items-center border-t border-white/5">
              <span className="text-[10px] uppercase font-semibold text-white/30">{record.type}</span>
              <button className="text-primary hover:text-primary/80"><Download className="w-4 h-4" /></button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl h-12">
        Add Previous Record
      </Button>
    </div>
  );
}
