import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Link as LinkIcon, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function FilemakerSettings() {
  const { toast } = useToast();
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);

  const handleTest = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult("success");
      toast({ title: "Connection Successful", description: "Successfully connected to FileMaker Server." });
    }, 1500);
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <Link href="/settings" className="text-primary text-sm font-medium mb-2 inline-block">← Back</Link>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          FileMaker <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30">Future Integration</span>
        </h1>
        <p className="text-muted-foreground text-sm">Configure data sync with clinical systems.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-sm font-medium text-white">Enable Integration</p>
              <p className="text-xs text-white/50">Sync CaseTrack with FileMaker</p>
            </div>
            <Switch />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white/80">FileMaker Server URL</Label>
              <Input defaultValue="https://fm.occu-med.test" className="bg-black/20 border-white/10 text-white h-10 rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-white/80">Database Name</Label>
                <Input defaultValue="OM_Clinical" className="bg-black/20 border-white/10 text-white h-10 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">Layout Name</Label>
                <Input defaultValue="CaseAPI" className="bg-black/20 border-white/10 text-white h-10 rounded-xl" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-white/80">API Username</Label>
                <Input defaultValue="api_casetrack" className="bg-black/20 border-white/10 text-white h-10 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">API Password</Label>
                <Input type="password" defaultValue="********" className="bg-black/20 border-white/10 text-white h-10 rounded-xl" />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button onClick={handleTest} disabled={isTesting} className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white h-12 rounded-xl">
                {isTesting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <LinkIcon className="w-4 h-4 mr-2" />}
                Test Connection
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl glow-blue">
                Save Settings
              </Button>
            </div>

            {testResult === "success" && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-sm mt-4">
                <CheckCircle2 className="w-4 h-4" /> Connected to FileMaker Server 19.6.3
              </div>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
