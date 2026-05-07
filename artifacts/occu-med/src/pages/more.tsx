import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { 
  FileText, Activity, Map, Bell, Shield, 
  Settings, LogOut, Info, Phone, CalendarClock, Plane, Stethoscope 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function More() {
  const { logout, role } = useAuth();
  const isAdmin = role === "admin";

  const applicantMenuGroups = [
    {
      title: "Case Details",
      items: [
        { icon: Activity, label: "Live Case Timeline", href: "/timeline", color: "text-blue-400" },
        { icon: Info, label: "RDQA Explainer", href: "/rdqa", color: "text-amber-400" },
        { icon: Shield, label: "Waiver Tracker", href: "/waiver", color: "text-emerald-400" },
      ]
    },
    {
      title: "Resources",
      items: [
        { icon: Plane, label: "Travel Readiness", href: "/travel", color: "text-cyan-400" },
        { icon: FileText, label: "Medical Vault", href: "/vault", color: "text-purple-400" },
        { icon: FileText, label: "OccuSign eForms", href: "/eforms", color: "text-pink-400" },
        { icon: Map, label: "Clinic Map", href: "/map", color: "text-teal-400" },
        { icon: Stethoscope, label: "Provider Instructions", href: "/provider-instructions", color: "text-indigo-400" },
      ]
    },
    {
      title: "Actions",
      items: [
        { icon: Phone, label: "Request Phone Appt", href: "/appointment-request", color: "text-orange-400" },
        { icon: CalendarClock, label: "Request Extension", href: "/extension-request", color: "text-rose-400" },
        { icon: Bell, label: "Reminders", href: "/reminders", color: "text-yellow-400" },
      ]
    },
    {
      title: "Account",
      items: [
        { icon: Settings, label: "Profile", href: "/profile", color: "text-slate-400" },
        { icon: Settings, label: "Settings", href: "/settings", color: "text-slate-400" },
      ]
    }
  ];

  const adminMenuGroups = [
    {
      title: "Settings & Setup",
      items: [
        { icon: Settings, label: "Settings", href: "/settings", color: "text-slate-400" },
      ]
    }
  ];

  const menuGroups = isAdmin ? adminMenuGroups : applicantMenuGroups;

  return (
    <div className="p-4 space-y-6 pb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">More</h1>
        <p className="text-muted-foreground text-sm">Resources and settings.</p>
      </div>

      {menuGroups.map((group, i) => (
        <motion.div 
          key={group.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="space-y-2"
        >
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider px-2">{group.title}</h3>
          <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/5 border border-white/5">
            {group.items.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-sm font-medium text-white/90 flex-1">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-white/20" />
              </Link>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="pt-4">
        <Button onClick={logout} variant="destructive" className="w-full bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl h-12">
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </motion.div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>;
}
