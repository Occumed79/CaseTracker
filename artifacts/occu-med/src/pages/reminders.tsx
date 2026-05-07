import { motion } from "framer-motion";
import { Bell, Calendar, FileWarning, Clock } from "lucide-react";

const mockReminders = [
  { id: 1, type: "appointment", title: "Upcoming Clinic Appointment", desc: "Physical Exam & Labs at Concentra Urgent Care. Bring your authorization packet and photo ID.", date: "Tomorrow, 9:00 AM", urgent: true },
  { id: 2, type: "fasting", title: "Fasting Reminder", desc: "Remember to fast for 8-12 hours before your lab work. Water is permitted.", date: "Tonight, 9:00 PM", urgent: false },
  { id: 3, type: "document", title: "Missing Authorization", desc: "Please upload your signed HIPAA release form.", date: "Due in 2 days", urgent: false },
];

export default function Reminders() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Reminders</h1>
        <p className="text-muted-foreground text-sm">Important alerts and upcoming events.</p>
      </div>

      <div className="space-y-4">
        {mockReminders.map((reminder, i) => {
          let Icon = Bell;
          let color = "text-blue-400 bg-blue-400/10";
          if (reminder.type === "appointment") { Icon = Calendar; color = "text-purple-400 bg-purple-400/10"; }
          if (reminder.type === "document") { Icon = FileWarning; color = "text-amber-400 bg-amber-400/10"; }
          if (reminder.type === "fasting") { Icon = Clock; color = "text-emerald-400 bg-emerald-400/10"; }

          return (
            <motion.div 
              key={reminder.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-5 rounded-2xl border ${reminder.urgent ? 'border-primary/40 glow-blue' : 'border-white/5'}`}
            >
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white font-medium">{reminder.title}</h3>
                  </div>
                  <p className="text-sm text-white/70 mb-3">{reminder.desc}</p>
                  <span className="text-xs font-semibold text-primary px-2 py-1 rounded bg-primary/10 border border-primary/20 inline-block">
                    {reminder.date}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
