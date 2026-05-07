import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Navigation, Phone, Star, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockClinics = [
  { id: 1, name: "Concentra Urgent Care", address: "123 Main St, City, ST 12345", distance: "2.1 miles", phone: "(555) 123-4567", status: "Preferred", type: "Chain" },
  { id: 2, name: "City Occupational Health", address: "456 Oak Ave, City, ST 12345", distance: "3.5 miles", phone: "(555) 987-6543", status: "Active", type: "Independent" },
  { id: 3, name: "Valley Med Walk-In", address: "789 Pine Ln, City, ST 12345", distance: "5.0 miles", phone: "(555) 456-7890", status: "Needs Confirmation", type: "Independent" },
];

export default function Map() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="space-y-1 mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Find a Clinic</h1>
        <p className="text-muted-foreground text-sm">Locate approved medical facilities near you.</p>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ZIP or City..."
            className="pl-9 bg-black/20 border-white/10 text-white rounded-xl h-12"
          />
        </div>
        <button className="w-12 h-12 glass-card rounded-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {mockClinics.map((clinic, i) => (
          <motion.div 
            key={clinic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-4 border border-white/5"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-semibold text-base">{clinic.name}</h3>
              {clinic.status === "Preferred" && (
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Preferred
                </span>
              )}
            </div>
            
            <p className="text-sm text-white/70 mb-1">{clinic.address}</p>
            <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {clinic.distance}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {clinic.phone}</span>
            </div>

            <div className="flex gap-2">
              <a href={`https://maps.google.com/?q=${clinic.address}`} target="_blank" rel="noreferrer" className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-sm font-medium text-white transition-colors">
                <Navigation className="w-4 h-4 text-primary" /> Directions
              </a>
              <a href={`tel:${clinic.phone}`} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-sm font-medium text-white transition-colors">
                <Phone className="w-4 h-4 text-emerald-400" /> Call
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
