import { motion } from "framer-motion";
import { Link } from "wouter";
import { Globe, Type, Eye, Palette, Database, ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">App preferences and integrations.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider px-2">Accessibility & Language</h3>
          <div className="glass-card rounded-2xl border border-white/5 divide-y divide-white/5">
            
            <div className="p-4 space-y-3">
              <Label className="text-white/80 flex items-center gap-2"><Globe className="w-4 h-4" /> Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="bg-black/20 border-white/10 text-white h-10 rounded-xl">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-white/10">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Type className="w-4 h-4 text-white/50" />
                <Label className="text-sm font-medium text-white m-0">Larger Text</Label>
              </div>
              <Switch />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-4 h-4 text-white/50" />
                <Label className="text-sm font-medium text-white m-0">Simplified Explanations</Label>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4 text-white/50" />
                <Label className="text-sm font-medium text-white m-0">High Contrast Mode</Label>
              </div>
              <Switch />
            </div>

          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider px-2">Integrations</h3>
          <div className="glass-card rounded-2xl border border-white/5">
            <Link href="/settings/filemaker" className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-white">FileMaker Integration</p>
                  <p className="text-[10px] text-white/40">Sync data with clinical systems</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/30" />
            </Link>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
