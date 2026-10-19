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
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Generate Invites</h1>
        <p className="text-muted-foreground text-sm">Create access codes for new applicants.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-6 border border-border">
        <form onSubmit={generateCode} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground">Applicant Name</Label>
            <Input required placeholder="Jane Doe" className="bg-secondary border-border text-foreground h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Employer / Contract</Label>
            <Input required placeholder="V2X" className="bg-secondary border-border text-foreground h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Exam Type</Label>
            <Input required placeholder="Pre-employment" className="bg-secondary border-border text-foreground h-12 rounded-xl" />
          </div>

          <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base mt-2 glow-blue">
            <Plus className="w-4 h-4 mr-2" /> Generate Code
          </Button>
        </form>

        {code && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 rounded-2xl bg-secondary border border-primary/40 glow-blue text-center"
          >
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Invitation Code</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-mono text-foreground tracking-widest">{code}</span>
              <button onClick={handleCopy} className="p-2 rounded-lg bg-secondary hover:bg-secondary text-foreground transition-colors">
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-3">Code expires in 7 days</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
