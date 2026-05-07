import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Printer, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProviderInstructions() {
  const [condition, setCondition] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Provider Instructions</h1>
        <p className="text-muted-foreground text-sm">Generate printable checklists for your doctor.</p>
      </div>

      {!generated ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-6 border border-white/10">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-white/80">Medical Condition</Label>
              <Select onValueChange={setCondition} required>
                <SelectTrigger className="bg-black/20 border-white/10 text-white h-12 rounded-xl">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-white/10">
                  <SelectItem value="hypertension">Hypertension (High Blood Pressure)</SelectItem>
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="asthma">Asthma</SelectItem>
                  <SelectItem value="cardiac">Cardiac History</SelectItem>
                  <SelectItem value="psychiatric">Psychiatric History</SelectItem>
                  <SelectItem value="orthopedic">Orthopedic Issue</SelectItem>
                  <SelectItem value="sleep_apnea">Sleep Apnea / CPAP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Specialist Type</Label>
              <Select required>
                <SelectTrigger className="bg-black/20 border-white/10 text-white h-12 rounded-xl">
                  <SelectValue placeholder="Select specialist" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-white/10">
                  <SelectItem value="pcp">Primary Care Provider</SelectItem>
                  <SelectItem value="cardiologist">Cardiologist</SelectItem>
                  <SelectItem value="endocrinologist">Endocrinologist</SelectItem>
                  <SelectItem value="pulmonologist">Pulmonologist</SelectItem>
                  <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                  <SelectItem value="orthopedist">Orthopedist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base mt-4 glow-blue shimmer-btn">
              Generate Checklist
            </Button>
          </form>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
          <div className="glass-card rounded-2xl bg-white p-6 relative">
            <div className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Occu-Med Provider Checklist</h2>
                <p className="text-sm text-gray-500">Applicant: Alex Applicant | Case: OM-2026-0148</p>
              </div>
              <img src="/occu-med-logo.png" alt="Logo" className="h-8 filter invert" />
            </div>

            <div className="space-y-4 text-gray-800">
              <p className="font-medium">Dear Provider,</p>
              <p className="text-sm leading-relaxed">
                Your patient is undergoing a medical clearance examination for deployment or specialized employment. Please provide a clearance letter on official letterhead that addresses the following points regarding their <strong className="text-primary">{condition || "condition"}</strong>:
              </p>
              
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-2 text-sm">
                  <div className="w-5 h-5 rounded border border-gray-300 mt-0.5 shrink-0"></div>
                  Current status of the condition (stable, improving, uncontrolled).
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <div className="w-5 h-5 rounded border border-gray-300 mt-0.5 shrink-0"></div>
                  List of current medications, dosages, and compliance.
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <div className="w-5 h-5 rounded border border-gray-300 mt-0.5 shrink-0"></div>
                  Any recommended restrictions or limitations on physical activity.
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <div className="w-5 h-5 rounded border border-gray-300 mt-0.5 shrink-0"></div>
                  Clearance to work in a remote environment with limited medical access.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setGenerated(false)} variant="outline" className="flex-1 h-12 rounded-xl bg-white/5 border-white/10 hover:bg-white/10">
              Back
            </Button>
            <Button onClick={() => window.print()} className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-blue">
              <Printer className="w-4 h-4 mr-2" />
              Print PDF
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
