import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const { login } = useAuth();
  const [inviteCode, setInviteCode] = useState("");

  const handleApplicantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login("applicant");
  };

  return (
    <div className="min-h-[100dvh] aurora-bg flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center p-1.5 glow-blue border border-white/20">
            <img src="/occu-med-logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">CaseTrack</h1>
            <p className="text-xs text-muted-foreground">Applicant Portal</p>
          </div>
        </div>

        <form onSubmit={handleApplicantLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="inviteCode" className="text-white/80">Invitation Code</Label>
            <Input 
              id="inviteCode" 
              placeholder="e.g. OM-ABCD-1234" 
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="bg-black/20 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-primary focus:ring-primary"
            />
            <p className="text-xs text-white/50">Enter the code provided by your recruiter or HR contact.</p>
          </div>
          
          <Button type="submit" className="w-full h-12 rounded-xl shimmer-btn bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base glow-blue">
            Access My Case
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
          <p className="text-xs text-center text-white/50 uppercase tracking-wider font-semibold">Demo Access</p>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => login("applicant")} className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white h-10">
              Demo Applicant
            </Button>
            <Button variant="outline" onClick={() => login("admin")} className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white h-10">
              Demo Admin
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
