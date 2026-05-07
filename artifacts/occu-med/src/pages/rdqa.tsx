import { useState } from "react";
import { motion } from "framer-motion";
import { Info, Sparkles, ArrowRight, Activity, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function RDQAExplainer() {
  const [query, setQuery] = useState("");
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const handleExplain = () => {
    if (!query.trim()) return;
    setIsExplaining(true);
    // Mock API delay
    setTimeout(() => {
      setExplanation("Your provider is requesting a 'Clearance Letter' from your cardiologist. This means your heart specialist needs to write a brief letter stating that your current condition is stable and that you have no restrictions for working in a deployed environment. They also need to see your blood pressure readings for the last 30 days to ensure your medication is working correctly.");
      setIsExplaining(false);
    }, 1500);
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">RDQA Explainer</h1>
        <p className="text-muted-foreground text-sm">Understand your medical requests.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-5 border border-amber-500/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full"></div>
        <div className="flex gap-3 items-start relative z-10">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500 mt-1 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">What is an RDQA?</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              "Request for Documentation, Qualification, or Action" is standard procedure. It means the medical review team needs more specific information from your personal doctor before they can clear you. It is not a denial.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3">
        <h3 className="text-sm font-semibold text-white/80 px-1">Translate Medical Jargon</h3>
        <div className="glass-card rounded-2xl p-4 border border-primary/20">
          <p className="text-xs text-white/60 mb-3">Paste the text from your RDQA notice below, and we'll explain it in plain English.</p>
          <Textarea 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'SME requires cardiology clearance stating no restrictions...'"
            className="min-h-[100px] bg-black/20 border-white/10 text-white resize-none mb-3"
          />
          <Button 
            onClick={handleExplain} 
            disabled={!query.trim() || isExplaining}
            className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-xl"
          >
            {isExplaining ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Explain This Request
              </span>
            )}
          </Button>
        </div>

        {explanation && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="glass-card rounded-2xl p-5 border border-primary/40 glow-blue relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-16 h-16 text-primary" />
            </div>
            <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Plain English Explanation
            </h4>
            <p className="text-sm text-white/90 leading-relaxed relative z-10">{explanation}</p>
            
            <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
              <h5 className="text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Checklist for your doctor:</h5>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-white/80">
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  Clearance letter stating "no restrictions"
                </li>
                <li className="flex items-start gap-2 text-sm text-white/80">
                  <Activity className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  Blood pressure logs (last 30 days)
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
