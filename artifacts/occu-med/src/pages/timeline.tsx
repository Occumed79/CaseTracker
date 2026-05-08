import { motion } from "framer-motion";

const EVENTS = [
  { id:1,  label:"Referral Received",              date:"Apr 10, 2026", state:"done"    },
  { id:2,  label:"Scheduling in Progress",         date:"Apr 11, 2026", state:"done"    },
  { id:3,  label:"Appointment Scheduled",          date:"Apr 13, 2026", state:"done"    },
  { id:4,  label:"Authorization Sent",             date:"Apr 14, 2026", state:"done"    },
  { id:5,  label:"Appointment Attended",           date:"Apr 15, 2026", state:"done"    },
  { id:6,  label:"Results Pending",                date:"Apr 17, 2026", state:"done"    },
  { id:7,  label:"Results Received",               date:"Apr 20, 2026", state:"done"    },
  { id:8,  label:"Under SME Medical Review",       date:"Apr 23, 2026", state:"done"    },
  { id:9,  label:"RDQA Required",                  date:"Apr 28, 2026", state:"active"  },
  { id:10, label:"Additional Info Requested",      date:"Apr 28, 2026", state:"active"  },
  { id:11, label:"Additional Info Submitted",      date:null,           state:"pending" },
  { id:12, label:"Final Recommendation Pending",   date:null,           state:"pending" },
  { id:13, label:"Cleared",                        date:null,           state:"pending" },
];

export default function Timeline() {
  const done   = EVENTS.filter(e=>e.state==="done").length;
  const total  = EVENTS.length;
  const pct    = Math.round((done/total)*100);

  return (
    <div className="px-4 pt-4 pb-8 space-y-4">
      <div className="pt-1">
        <p className="text-label mb-0.5" style={{color:"rgba(147,197,253,0.6)"}}>Case Progress</p>
        <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-none">Timeline</h1>
      </div>

      {/* Progress card */}
      <div className="glass-elevated glass-refract rounded-[24px] p-4 relative overflow-hidden"
        style={{border:"1px solid rgba(59,130,246,0.20)"}}>
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full"
          style={{background:"radial-gradient(circle,rgba(37,99,235,0.28) 0%,transparent 70%)",filter:"blur(24px)"}}/>
        <div className="flex justify-between items-center mb-2">
          <span className="text-label" style={{color:"rgba(147,197,253,0.65)"}}>Steps Completed</span>
          <span className="text-[22px] font-black leading-none" style={{color:"rgb(147,197,253)"}}>{done}<span className="text-caption font-medium text-white/40">/{total}</span></span>
        </div>
        <div className="progress-track h-2 mb-2">
          <div className="progress-fill" style={{width:`${pct}%`,height:"100%"}}/>
        </div>
        <p className="text-caption" style={{color:"rgba(255,255,255,0.35)"}}>{pct}% of case milestones reached</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px" style={{background:"linear-gradient(180deg,rgba(59,130,246,0.40) 0%,rgba(255,255,255,0.06) 80%)"}}/>

        <div className="space-y-0">
          {EVENTS.map((ev,i)=>(
            <motion.div key={ev.id}
              initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
              transition={{delay:i*0.04,duration:0.4,ease:[0.16,1,0.3,1]}}
              className="flex gap-4 relative py-2.5"
            >
              {/* Dot */}
              <div className="flex-shrink-0 w-10 flex items-start justify-center pt-0.5">
                <div className={`timeline-dot ${
                  ev.state==="done"?"timeline-dot-done":
                  ev.state==="active"?"timeline-dot-active":
                  "timeline-dot-pending"
                }`}/>
              </div>

              {/* Content */}
              <div className={`flex-1 min-w-0 pb-2 ${i<EVENTS.length-1?"border-b":""}  border-white/[0.05]`}>
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-[13.5px] font-semibold leading-tight ${
                    ev.state==="pending"?"text-white/35":
                    ev.state==="active"?"text-blue-300":"text-white/80"
                  }`}>{ev.label}</p>
                  {ev.state==="active" && (
                    <span className="badge badge-urgent" style={{fontSize:8}}>Active</span>
                  )}
                </div>
                {ev.date && (
                  <p className="text-caption mt-0.5" style={{color:"rgba(255,255,255,0.30)"}}>{ev.date}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
