import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockCases = [
  { id: "OM-2026-0148", name: "Alex Applicant", employer: "V2X", status: "RDQA Required", priority: "High" },
  { id: "OM-2026-0149", name: "Sarah Smith", employer: "Amentum", status: "Cleared", priority: "Normal" },
  { id: "OM-2026-0150", name: "John Johnson", employer: "KBR", status: "Under SME Review", priority: "High" },
  { id: "OM-2026-0151", name: "Emily Davis", employer: "V2X", status: "Waiver Pending", priority: "Normal" },
  { id: "OM-2026-0152", name: "Michael Brown", employer: "Amentum", status: "Scheduling", priority: "Normal" },
];

export default function AdminCases() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="space-y-1 mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Active Cases</h1>
        <p className="text-muted-foreground text-sm">Manage applicant medical records.</p>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ID..."
            className="pl-9 bg-black/20 border-white/10 text-white rounded-xl h-12"
          />
        </div>
        <button className="w-12 h-12 glass-card rounded-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {mockCases.map((c, i) => {
          let statusColor = "text-white/60 bg-white/10";
          if (c.status === "Cleared") statusColor = "text-emerald-400 bg-emerald-400/10";
          if (c.status === "RDQA Required") statusColor = "text-amber-400 bg-amber-400/10";
          if (c.status === "Waiver Pending") statusColor = "text-blue-400 bg-blue-400/10";
          if (c.status === "Under SME Review") statusColor = "text-purple-400 bg-purple-400/10";

          return (
            <motion.div 
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card p-4 rounded-2xl border transition-colors hover:bg-white/5 cursor-pointer ${c.priority === 'High' ? 'border-amber-500/30 glow-red' : 'border-white/5'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium text-base">{c.name}</h3>
                  <p className="text-xs text-white/50">{c.id} • {c.employer}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30" />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded ${statusColor}`}>
                  {c.status}
                </span>
                {c.priority === "High" && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded text-rose-400 bg-rose-400/10">
                    High Priority
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
