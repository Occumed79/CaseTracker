import { useState } from "react";
import { motion } from "framer-motion";
import { FileSignature, CheckCircle2, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockForms = [
  { id: 1, name: "Authorization for Examination", status: "Submitted", date: "May 1, 2026" },
  { id: 2, name: "HIPAA Release", status: "Not started", date: "Required" },
  { id: 3, name: "Consent to Electronic Records", status: "In progress", date: "Required" },
  { id: 4, name: "RDQA Acknowledgment", status: "Ready to submit", date: "Required" },
];

export default function EForms() {
  const [selectedForm, setSelectedForm] = useState<number | null>(null);

  if (selectedForm) {
    const form = mockForms.find(f => f.id === selectedForm);
    return (
      <div className="p-4 space-y-6 pb-20">
        <button onClick={() => setSelectedForm(null)} className="text-primary text-sm font-medium mb-4">← Back to Forms</button>
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">{form?.name}</h1>
          <p className="text-muted-foreground text-sm">Please review and sign electronically.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
           <div className="prose prose-invert prose-sm max-w-none text-white/80">
             <p>I hereby authorize Occu-Med to disclose my protected health information to my employer for the purpose of determining fitness for duty.</p>
             <p>This authorization is valid for one year from the date of signature.</p>
           </div>

           <div className="space-y-4 pt-4 border-t border-white/10">
             <div className="space-y-2">
               <label className="text-sm text-white/70">Electronic Signature (Type Full Name)</label>
               <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl h-12 px-4 text-white font-serif italic text-lg" placeholder="Jane Doe" />
             </div>
             
             <div className="flex items-start gap-3 mt-4">
               <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/20 bg-black/20" />
               <p className="text-xs text-white/60 leading-relaxed">
                 I consent to the use of electronic signatures and records. I understand this constitutes a legal signature.
               </p>
             </div>

             <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base mt-6 glow-blue">
               Sign & Submit
             </Button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">OccuSign eForms</h1>
        <p className="text-muted-foreground text-sm">Complete required paperwork electronically.</p>
      </div>

      <div className="space-y-3">
        {mockForms.map((form, i) => {
          let statusColor = "text-amber-400 bg-amber-400/10";
          let Icon = FileEdit;
          
          if (form.status === "Submitted") { statusColor = "text-emerald-400 bg-emerald-400/10"; Icon = CheckCircle2; }
          else if (form.status === "Not started") { statusColor = "text-rose-400 bg-rose-400/10"; }
          else if (form.status === "Ready to submit") { statusColor = "text-blue-400 bg-blue-400/10 glow-blue border-blue-500/30"; Icon = FileSignature; }

          return (
            <motion.div 
              key={form.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => form.status !== "Submitted" && setSelectedForm(form.id)}
              className={`glass-card p-4 rounded-2xl border transition-transform ${form.status !== 'Submitted' ? 'cursor-pointer hover:bg-white/5 active:scale-[0.98]' : 'opacity-70'} ${form.status === 'Ready to submit' ? 'border-primary/40 glow-blue' : 'border-white/5'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${statusColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm mb-1">{form.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${statusColor.split(' ')[0]}`}>{form.status}</span>
                    <span className="text-[10px] text-white/30">• {form.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
