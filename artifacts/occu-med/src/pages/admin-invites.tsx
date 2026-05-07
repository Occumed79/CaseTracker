import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminInvites() {
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateCode = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = `OM-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setCode(newCode);
    setCopied(false);
  };

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Generate Invites</h1>
        <p className="text-muted-foreground text-sm">Create access codes for new applicants.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-6 border border-white/10">
        <form onSubmit={generateCode} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white/80">Applicant Name</Label>
            <Input required placeholder="Jane Doe" className="bg-black/20 border-white/10 text-white h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Employer / Contract</Label>
            <Input required placeholder="V2X" className="bg-black/20 border-white/10 text-white h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Exam Type</Label>
            <Input required placeholder="Pre-employment" className="bg-black/20 border-white/10 text-white h-12 rounded-xl" />
          </div>
          
          <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base mt-2 glow-blue">
            <Plus className="w-4 h-4 mr-2" /> Generate Code
          </Button>
        </form>

        {code && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="mt-6 p-4 rounded-2xl bg-white/5 border border-primary/40 glow-blue text-center"
          >
            <p className="text-xs text-white/60 mb-2 uppercase tracking-wider">Invitation Code</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-mono text-white tracking-widest">{code}</span>
              <button onClick={handleCopy} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-[10px] text-white/40 mt-3">Code expires in 7 days</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
