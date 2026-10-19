import { applicantData } from "@/data/mockData";
import { motion } from "framer-motion";
import { User, Settings, Bell, Shield, Sun } from "lucide-react";

export default function Profile() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-6 border border-border flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary glow-blue">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">{applicantData.name}</h2>
          <p className="text-sm text-muted-foreground">{applicantData.employer} • {applicantData.position}</p>
        </div>
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground px-1">Settings</h3>

        <div className="glass-card rounded-2xl border border-border divide-y divide-border overflow-hidden">

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Push Notifications</p>
                <p className="text-[10px] text-muted-foreground">Alerts for tasks and messages</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" aria-label="Push notifications" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-border after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary glow-blue"></div>
            </label>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Appearance</p>
                <p className="text-[10px] text-muted-foreground">Light appearance</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Light</span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Auth</p>
                <p className="text-[10px] text-muted-foreground">Secure your account</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-primary px-3 py-1.5 bg-primary/10 rounded-lg">Setup</button>
          </div>

        </div>
      </div>
    </div>
  );
}
