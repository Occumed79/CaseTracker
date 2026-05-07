import { applicantData } from "@/data/mockData";
import { motion } from "framer-motion";
import { FileText, MapPin, MessageSquare, PhoneCall, UploadCloud, CalendarClock, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      {/* Header Info */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Hello, {applicantData.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground text-sm">{applicantData.employer} • {applicantData.position}</p>
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-white/70 mt-2">
          Case: {applicantData.caseNumber}
        </div>
      </motion.div>

      {/* Main Status Card */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card rounded-3xl p-5 relative overflow-hidden border border-amber-500/20">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 blur-3xl rounded-full"></div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs text-amber-500 font-medium uppercase tracking-wider mb-1">Current Status</p>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {applicantData.status}
              <span className="w-2 h-2 rounded-full bg-amber-500 glow-red animate-pulse"></span>
            </h2>
          </div>
          <div className="bg-black/30 rounded-xl p-2 text-center border border-white/5">
            <span className="block text-2xl font-bold text-amber-500">12</span>
            <span className="block text-[10px] uppercase text-white/60">Days Left</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1 text-sm text-white/80 font-medium">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Responsibility: {applicantData.responsibility}
            </div>
            <p className="text-sm text-white">{applicantData.nextAction}</p>
          </div>
          
          <Link href="/uploads" className="w-full flex items-center justify-center gap-2 bg-amber-500 text-black font-semibold py-3 rounded-xl shimmer-btn glow-red transition-transform active:scale-95">
            <UploadCloud className="w-5 h-5" />
            Upload Required Documents
          </Link>
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="text-sm font-semibold text-white/80 mb-3 px-1">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <ActionCard href="/messages" icon={MessageSquare} label="Message Case Manager" color="bg-blue-500/10 text-blue-400" />
          <ActionCard href="/eforms" icon={FileText} label="View Forms" color="bg-purple-500/10 text-purple-400" />
          <ActionCard href="/map" icon={MapPin} label="Find Clinic" color="bg-emerald-500/10 text-emerald-400" />
          <ActionCard href="/appointment-request" icon={PhoneCall} label="Request Call" color="bg-orange-500/10 text-orange-400" />
          <ActionCard href="/extension-request" icon={CalendarClock} label="Request Extension" color="bg-rose-500/10 text-rose-400" />
        </div>
      </motion.div>
    </div>
  );
}

function ActionCard({ href, icon: Icon, label, color }: { href: string, icon: any, label: string, color: string }) {
  return (
    <Link href={href} className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-3 text-center transition-transform active:scale-95 hover:bg-white/10">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-medium text-white/90">{label}</span>
    </Link>
  );
}
