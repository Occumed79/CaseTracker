import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSignature, CheckCircle2, Clock, AlertCircle, ChevronRight, ExternalLink } from "lucide-react";

// ── The eForm iframe URL is read from environment / localStorage.
// Admin can set it via Settings → FileMaker. For now we use a placeholder.
const EFORM_BASE_URL = (typeof window !== "undefined" && window.localStorage?.getItem("eform_url")) || "";

const FORMS = [
  { id:1, name:"Authorization for Examination",          status:"Submitted",       date:"May 1, 2026",  required:true  },
  { id:2, name:"HIPAA / Medical Records Release",         status:"Not Started",     date:"Required",     required:true  },
  { id:3, name:"Consent to Electronic Records & Sigs",   status:"In Progress",     date:"Required",     required:true  },
  { id:4, name:"RDQA Acknowledgment Form",               status:"Ready to Submit", date:"Required",     required:true  },
  { id:5, name:"Provider Release Authorization",         status:"Not Started",     date:"Optional",     required:false },
];

const STAT: Record<string,{badge:string;icon:any;border:string}> = {
  "Submitted":      {badge:"badge-complete",    icon:CheckCircle2,  border:"rgba(16,185,129,0.20)"},
  "In Progress":    {badge:"badge-pending",     icon:Clock,         border:"rgba(59,130,246,0.18)"},
  "Ready to Submit":{badge:"badge-missing",     icon:AlertCircle,   border:"rgba(245,158,11,0.18)"},
  "Not Started":    {badge:"badge-correction",  icon:FileSignature, border:"rgba(139,92,246,0.16)"},
};

export default function EForms() {
  const [active, setActive] = useState<number|null>(null);

  const activeForm = FORMS.find(f=>f.id===active);

  if (active && activeForm) {
    const formUrl = EFORM_BASE_URL
      ? `${EFORM_BASE_URL}?form_id=${active}&form_name=${encodeURIComponent(activeForm.name)}`
      : "";

    return (
      <div className="flex flex-col h-[calc(100dvh-54px-80px)]">
        {/* Header */}
        <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
          style={{background:"rgba(6,10,24,0.60)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <button onClick={()=>setActive(null)}
            className="h-8 px-3 rounded-xl text-[12px] font-bold flex items-center gap-1.5 card-hover"
            style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.10)",color:"rgba(255,255,255,0.7)"}}>
            ← Back
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-white truncate">{activeForm.name}</p>
            <p className="text-caption" style={{color:"rgba(255,255,255,0.35)"}}>OccuSign · Electronic Signature</p>
          </div>
        </div>

        {/* iframe or placeholder */}
        {formUrl ? (
          <iframe
            src={formUrl}
            className="flex-1 w-full"
            style={{border:"none"}}
            title={activeForm.name}
            allow="camera; microphone; geolocation"
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
            {/* Placeholder state */}
            <div className="w-20 h-20 rounded-[24px] flex items-center justify-center glow-purple"
              style={{background:"rgba(139,92,246,0.15)",border:"1.5px solid rgba(139,92,246,0.35)"}}>
              <FileSignature style={{width:36,height:36,color:"rgb(196,181,253)"}}/>
            </div>
            <div className="text-center">
              <h2 className="text-[20px] font-bold text-white mb-1">{activeForm.name}</h2>
              <p className="text-caption" style={{color:"rgba(255,255,255,0.42)"}}>
                The OccuSign eForm tool is deployed separately. When a form URL is configured in Settings → FileMaker Integration, it will appear here as an embedded experience.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-4 w-full"
              style={{border:"1px solid rgba(139,92,246,0.22)",background:"rgba(139,92,246,0.07)"}}>
              <p className="text-label mb-2" style={{color:"rgba(196,181,253,0.7)"}}>How to connect</p>
              <ol className="space-y-1.5">
                {["Go to Settings → FileMaker Integration","Enter your OccuSign / form tool URL","Return here — forms will load automatically"].map((s,i)=>(
                  <li key={i} className="flex items-start gap-2 text-caption" style={{color:"rgba(255,255,255,0.55)"}}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold mt-px"
                      style={{background:"rgba(139,92,246,0.25)",color:"rgb(196,181,253)"}}>{i+1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <button onClick={()=>setActive(null)}
              className="shimmer-btn h-11 px-6 rounded-2xl font-bold text-[13px] glow-purple"
              style={{background:"linear-gradient(135deg,rgba(139,92,246,0.30) 0%,rgba(124,58,237,0.40) 100%)",border:"1px solid rgba(139,92,246,0.40)",color:"rgb(196,181,253)"}}>
              Back to Forms
            </button>
          </div>
        )}
      </div>
    );
  }

  const done    = FORMS.filter(f=>f.status==="Submitted").length;
  const pending = FORMS.filter(f=>f.status!=="Submitted").length;

  return (
    <div className="px-4 pt-4 pb-8 space-y-4">
      <div className="pt-1">
        <p className="text-label mb-0.5" style={{color:"rgba(196,181,253,0.65)"}}>Electronic Signature</p>
        <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-none">OccuSign</h1>
        <p className="text-caption mt-1" style={{color:"rgba(255,255,255,0.38)"}}>Complete required paperwork electronically.</p>
      </div>

      {/* Progress */}
      <div className="glass-elevated glass-refract rounded-[24px] p-4 relative overflow-hidden"
        style={{border:"1px solid rgba(139,92,246,0.22)"}}>
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full"
          style={{background:"radial-gradient(circle,rgba(139,92,246,0.28) 0%,transparent 70%)",filter:"blur(20px)"}}/>
        <div className="flex justify-between items-center mb-3">
          <span className="text-label" style={{color:"rgba(196,181,253,0.7)"}}>Form Completion</span>
          <span className="text-caption font-bold" style={{color:"rgba(196,181,253,0.9)"}}>{done}/{FORMS.length} complete</span>
        </div>
        <div className="progress-track h-1.5">
          <div className="progress-fill" style={{
            width:`${(done/FORMS.length)*100}%`, height:"100%",
            background:"linear-gradient(90deg,hsl(263,85%,55%) 0%,hsl(280,80%,65%) 100%)",
            boxShadow:"0 0 14px rgba(139,92,246,0.60),0 0 28px rgba(139,92,246,0.28)",
          }}/>
        </div>
        {pending>0 && (
          <p className="text-caption mt-2" style={{color:"rgba(255,255,255,0.38)"}}>
            {pending} form{pending!==1?"s":""} remaining
          </p>
        )}
      </div>

      {/* Form list */}
      <div className="space-y-2.5">
        {FORMS.map((form,i)=>{
          const s = STAT[form.status]||STAT["Not Started"];
          const Icon = s.icon;
          return (
            <motion.div key={form.id}
              initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
              transition={{delay:i*0.06,duration:0.4,ease:[0.16,1,0.3,1]}}
              className="glass-card rounded-[20px] p-4 card-hover cursor-pointer"
              style={{border:`1px solid ${s.border}`}}
              onClick={()=>setActive(form.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{background:s.border.replace(/[\d.]+\)$/,"0.14)"),border:`1px solid ${s.border}`}}>
                  <Icon style={{width:16,height:16}}/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-white leading-tight">{form.name}</p>
                  <p className="text-caption mt-0.5" style={{color:"rgba(255,255,255,0.35)"}}>
                    {form.required?"Required":"Optional"} · {form.date}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`badge ${s.badge}`}>{form.status}</span>
                  <ChevronRight style={{width:14,height:14,color:"rgba(255,255,255,0.25)"}}/>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Note about iframe connection */}
      <div className="glass-card rounded-[20px] p-4 flex items-start gap-3"
        style={{background:"rgba(59,130,246,0.06)",border:"1px solid rgba(59,130,246,0.18)"}}>
        <ExternalLink style={{width:15,height:15,color:"rgb(147,197,253)",flexShrink:0,marginTop:1}}/>
        <p className="text-caption leading-relaxed" style={{color:"rgba(255,255,255,0.45)"}}>
          Forms open as an embedded tool. Configure your form platform URL in{" "}
          <span className="font-semibold" style={{color:"rgb(147,197,253)"}}>Settings → FileMaker Integration</span>{" "}
          to enable live form completion.
        </p>
      </div>
    </div>
  );
}
