import { applicantData } from "@/data/mockData";
import { motion } from "framer-motion";
import { FileText, MapPin, MessageSquare, PhoneCall, UploadCloud, CalendarClock, Clock, TrendingUp, AlertTriangle, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const fade = (delay=0) => ({ hidden:{opacity:0,y:18}, show:{opacity:1,y:0,transition:{duration:0.55,ease:[0.16,1,0.3,1],delay}} });

export default function Dashboard() {
  const pct = 58;
  return (
    <div className="px-4 pt-4 pb-8 space-y-4">
      {/* ── Greeting ── */}
      <motion.div variants={fade(0)} initial="hidden" animate="show">
        <p className="text-label mb-0.5" style={{color:"rgba(147,197,253,0.6)"}}>Welcome back</p>
        <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-none">
          {applicantData.name.split(" ")[0]}
        </h1>
        <p className="text-caption mt-1" style={{color:"rgba(255,255,255,0.42)"}}>
          {applicantData.employer} · {applicantData.position}
        </p>
        <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full"
          style={{background:"rgba(59,130,246,0.12)",border:"1px solid rgba(59,130,246,0.24)"}}>
          <span className="dot dot-blue" style={{width:6,height:6}}/>
          <span className="text-caption font-semibold" style={{color:"rgb(147,197,253)"}}>Case {applicantData.caseNumber}</span>
        </div>
      </motion.div>

      {/* ── HERO STATUS CARD ── */}
      <motion.div variants={fade(0.07)} initial="hidden" animate="show">
        <div className="glass-elevated glass-refract rounded-[28px] p-5 relative overflow-hidden"
          style={{border:"1px solid rgba(245,158,11,0.22)"}}>
          {/* Ambient blob */}
          <div className="absolute -top-14 -right-14 w-44 h-44 rounded-full pointer-events-none"
            style={{background:"radial-gradient(circle,rgba(245,158,11,0.28) 0%,transparent 70%)",filter:"blur(28px)"}}/>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full pointer-events-none"
            style={{background:"radial-gradient(circle,rgba(37,99,235,0.22) 0%,transparent 70%)",filter:"blur(22px)"}}/>

          {/* Top row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1">
              <p className="text-label mb-1" style={{color:"rgba(252,211,77,0.72)"}}>Current Status</p>
              <div className="flex items-center gap-2">
                <h2 className="text-[22px] font-bold text-white tracking-tight leading-tight">{applicantData.status}</h2>
                <span className="dot dot-amber" style={{width:8,height:8,flexShrink:0}}/>
              </div>
            </div>
            {/* Countdown */}
            <div className="rounded-2xl px-4 py-3 text-center glow-amber flex-shrink-0"
              style={{background:"rgba(245,158,11,0.14)",border:"1px solid rgba(245,158,11,0.32)"}}>
              <span className="block text-[28px] font-black leading-none" style={{color:"rgb(252,211,77)"}}>12</span>
              <span className="text-label" style={{color:"rgba(252,211,77,0.6)",fontSize:8}}>Days Left</span>
            </div>
          </div>

          {/* Responsibility */}
          <div className="rounded-2xl p-3.5 mb-4"
            style={{background:"rgba(255,255,255,0.045)",border:"1px solid rgba(255,255,255,0.08)"}}>
            <div className="flex items-center gap-1.5 mb-1">
              <AlertTriangle style={{width:13,height:13,color:"rgb(252,211,77)"}}/>
              <span className="text-caption font-semibold" style={{color:"rgba(255,255,255,0.6)"}}>
                Responsibility: <span className="text-white">{applicantData.responsibility}</span>
              </span>
            </div>
            <p className="text-[13px] text-white leading-snug">{applicantData.nextAction}</p>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-label" style={{color:"rgba(255,255,255,0.4)"}}>Case Progress</span>
              <span className="text-caption font-bold" style={{color:"rgba(147,197,253,0.9)"}}>{pct}%</span>
            </div>
            <div className="progress-track h-1.5">
              <div className="progress-fill" style={{width:`${pct}%`,height:"100%"}}/>
            </div>
          </div>

          {/* CTA */}
          <Link href="/uploads"
            className="shimmer-btn w-full h-[48px] rounded-2xl font-bold text-[14px] glow-blue flex items-center justify-center gap-2"
            style={{
              background:"linear-gradient(135deg,hsl(217,100%,52%) 0%,hsl(200,100%,60%) 100%)",
              color:"hsl(224,50%,4%)",border:"1px solid rgba(59,130,246,0.35)",
              display:"flex",
            }}
          >
            <UploadCloud style={{width:18,height:18}}/> Upload Required Documents
          </Link>
        </div>
      </motion.div>

      {/* ── Quick Actions 3-col ── */}
      <motion.div variants={fade(0.13)} initial="hidden" animate="show">
        <p className="text-label mb-3" style={{color:"rgba(255,255,255,0.35)"}}>Quick Actions</p>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            {href:"/messages",            icon:MessageSquare, label:"Message",   a:"blue"},
            {href:"/eforms",              icon:FileText,      label:"eForms",    a:"purple"},
            {href:"/map",                 icon:MapPin,        label:"Clinic Map",a:"emerald"},
            {href:"/appointment-request", icon:PhoneCall,     label:"Request Call",a:"orange"},
            {href:"/extension-request",   icon:CalendarClock, label:"Extension", a:"rose"},
            {href:"/timeline",            icon:Clock,         label:"Timeline",  a:"cyan"},
          ].map(({ href, icon:Icon, label, a }) => (
            <Link key={href} href={href} className="card-hover glass-card rounded-[18px] p-3.5 flex flex-col items-center gap-2 text-center">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: ACCS[a].bg, border:`1px solid ${ACCS[a].bd}`,
                  boxShadow:`0 0 12px ${ACCS[a].glow}`,
                }}>
                <Icon style={{width:17,height:17,color:ACCS[a].color}}/>
              </div>
              <span className="text-caption font-semibold leading-tight" style={{color:"rgba(255,255,255,0.78)"}}>{label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Mini case info strip ── */}
      <motion.div variants={fade(0.19)} initial="hidden" animate="show">
        <div className="glass-card rounded-[20px] p-4 flex items-center gap-3"
          style={{border:"1px solid rgba(255,255,255,0.07)"}}>
          <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
            style={{background:"rgba(59,130,246,0.12)",border:"1px solid rgba(59,130,246,0.22)"}}>
            <TrendingUp style={{width:18,height:18,color:"rgb(147,197,253)"}}/>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-caption font-bold text-white">{applicantData.examType} · {applicantData.employer}</p>
            <p className="text-caption" style={{color:"rgba(255,255,255,0.38)"}}>{applicantData.position}</p>
          </div>
          <ChevronRight style={{width:16,height:16,color:"rgba(255,255,255,0.25)"}}/>
        </div>
      </motion.div>
    </div>
  );
}

const ACCS: Record<string,{bg:string;bd:string;color:string;glow:string}> = {
  blue:    {bg:"rgba(59,130,246,0.13)",  bd:"rgba(59,130,246,0.25)",  color:"rgb(147,197,253)", glow:"rgba(59,130,246,0.22)"},
  purple:  {bg:"rgba(139,92,246,0.13)",  bd:"rgba(139,92,246,0.25)",  color:"rgb(196,181,253)", glow:"rgba(139,92,246,0.20)"},
  emerald: {bg:"rgba(16,185,129,0.13)",  bd:"rgba(16,185,129,0.25)",  color:"rgb(110,231,183)", glow:"rgba(16,185,129,0.20)"},
  orange:  {bg:"rgba(249,115,22,0.13)",  bd:"rgba(249,115,22,0.25)",  color:"rgb(253,186,116)", glow:"rgba(249,115,22,0.20)"},
  rose:    {bg:"rgba(244,63,94,0.13)",   bd:"rgba(244,63,94,0.25)",   color:"rgb(253,164,175)", glow:"rgba(244,63,94,0.20)"},
  cyan:    {bg:"rgba(6,182,212,0.13)",   bd:"rgba(6,182,212,0.25)",   color:"rgb(103,232,249)", glow:"rgba(6,182,212,0.18)"},
};
