import { applicantData } from "@/data/mockData";
import { motion } from "framer-motion";
import { User, Settings, Bell, Shield, Moon } from "lucide-react";

export default function Profile() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-6 border border-white/10 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary glow-blue">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{applicantData.name}</h2>
          <p className="text-sm text-white/60">{applicantData.employer} • {applicantData.position}</p>
        </div>
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-white/80 px-1">Settings</h3>
        
        <div className="glass-card rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-white/50" />
              <div>
                <p className="text-sm font-medium text-white">Push Notifications</p>
                <p className="text-[10px] text-white/40">Alerts for tasks and messages</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary glow-blue"></div>
            </label>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-white/50" />
              <div>
                <p className="text-sm font-medium text-white">Dark Mode</p>
                <p className="text-[10px] text-white/40">Always active</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked disabled />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary opacity-50"></div>
            </label>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-white/50" />
              <div>
                <p className="text-sm font-medium text-white">Two-Factor Auth</p>
                <p className="text-[10px] text-white/40">Secure your account</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-primary px-3 py-1.5 bg-primary/10 rounded-lg">Setup</button>
          </div>

        </div>
      </div>
    </div>
  );
}
