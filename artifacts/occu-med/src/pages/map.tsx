import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Navigation, Phone, Filter, X, CheckCircle, Star, ChevronRight, ChevronDown } from "lucide-react";

const CLINICS = [
  {
    id:1, name:"Concentra Urgent Care",          address:"123 Main St, San Diego, CA 92101",
    distance:"2.1 mi", phone:"(619) 555-0100",   status:"Preferred",          type:"Chain",
    services:["Occupational Health","Urgent Care","Labs","Imaging","Audiogram"],
    lat:32.7157, lng:-117.1611,
    notes:"Preferred Occu-Med facility. Referral packet required.",
  },
  {
    id:2, name:"City Occupational Health",        address:"456 Oak Ave, San Diego, CA 92103",
    distance:"3.5 mi", phone:"(619) 555-0200",   status:"Active",             type:"Independent",
    services:["Occupational Health","Labs","Dental","Pulmonary Function Test"],
    lat:32.7330, lng:-117.1500,
    notes:"Independent provider. Call to confirm referral before visit.",
  },
  {
    id:3, name:"Valley Med Walk-In",              address:"789 Pine Ln, El Cajon, CA 92020",
    distance:"5.0 mi", phone:"(619) 555-0300",   status:"Needs Confirmation", type:"Independent",
    services:["Urgent Care","Labs","Vaccination","Treadmill Stress Test"],
    lat:32.7948, lng:-116.9625,
    notes:"Confirmation required. Contact case manager before scheduling.",
  },
  {
    id:4, name:"Sharp Rees-Stealy Medical Center",address:"2001 4th Ave, San Diego, CA 92101",
    distance:"1.8 mi", phone:"(619) 555-0400",   status:"Active",             type:"Chain",
    services:["Advanced Diagnostic Imaging","Hospital-Based Services","Labs","Audiogram"],
    lat:32.7185, lng:-117.1625,
    notes:"Hospital-based services available. Specialist referral may be needed.",
  },
];

const FILTERS = [
  "All","Occupational Health","Urgent Care","Labs","Imaging",
  "Dental","Vaccination","Treadmill Stress Test","Pulmonary Function Test",
  "Audiogram","Hospital-Based Services","Advanced Diagnostic Imaging",
];

const STATUS_BADGE: Record<string,string> = {
  Preferred:"badge-preferred",
  Active:"badge-active",
  "Needs Confirmation":"badge-warning",
};

export default function ClinicMap() {
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("All");
  const [selected, setSelected] = useState<number|null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = CLINICS.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter==="All" || c.services.includes(filter);
    return matchSearch && matchFilter;
  });

  const selectedClinic = CLINICS.find(c=>c.id===selected);

  // Build a Google Maps embed URL for the visible area
  const mapQuery = selectedClinic
    ? encodeURIComponent(selectedClinic.address)
    : encodeURIComponent("occupational health clinic San Diego CA");
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&z=13&output=embed&disableDefaultUI=1`;

  return (
    <div className="flex flex-col h-[calc(100dvh-54px-80px)]">
      {/* ── Top controls ── */}
      <div className="px-4 pt-4 pb-2 flex-shrink-0 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",width:15,height:15,color:"rgba(255,255,255,0.35)"}}/>
            <input
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Search ZIP or city…"
              className="glass-input w-full h-10 pl-9 pr-4 text-[13px]"
            />
          </div>
          <motion.button
            whileTap={{scale:0.9}}
            onClick={()=>setShowFilters(!showFilters)}
            className="w-10 h-10 rounded-2xl flex items-center justify-center relative"
            style={{
              background: filter!=="All"?"rgba(59,130,246,0.18)":"rgba(255,255,255,0.07)",
              border: filter!=="All"?"1px solid rgba(59,130,246,0.35)":"1px solid rgba(255,255,255,0.10)",
            }}
          >
            <Filter style={{width:15,height:15,color: filter!=="All"?"rgb(147,197,253)":"rgba(255,255,255,0.55)"}}/>
            {filter!=="All" && <span className="absolute top-1 right-1 w-2 h-2 rounded-full dot dot-blue" style={{width:6,height:6}}/>}
          </motion.button>
        </div>

        {/* Filter chips */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}
              exit={{height:0,opacity:0}} transition={{duration:0.22}}
              className="overflow-x-auto pb-1"
            >
              <div className="flex gap-2 min-w-max">
                {FILTERS.map(f=>(
                  <button key={f} onClick={()=>{setFilter(f);setShowFilters(false)}}
                    className="h-7 px-3 rounded-full text-[11px] font-semibold whitespace-nowrap flex-shrink-0 transition-all"
                    style={{
                      background: filter===f?"rgba(59,130,246,0.22)":"rgba(255,255,255,0.07)",
                      border: filter===f?"1px solid rgba(59,130,246,0.40)":"1px solid rgba(255,255,255,0.09)",
                      color: filter===f?"rgb(147,197,253)":"rgba(255,255,255,0.55)",
                      boxShadow: filter===f?"0 0 10px rgba(59,130,246,0.20)":"none",
                    }}
                  >{f}</button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Map iframe ── */}
      <div className="mx-4 flex-shrink-0" style={{height:220,borderRadius:20,overflow:"hidden",border:"1px solid rgba(255,255,255,0.10)",boxShadow:"0 8px 32px rgba(0,0,0,0.45)"}}>
        <iframe
          src={mapSrc}
          width="100%" height="100%"
          style={{border:"none",filter:"hue-rotate(200deg) saturate(0.7) brightness(0.75)"}}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Clinic Map"
        />
        {/* Map overlay label */}
        <div style={{position:"relative",marginTop:-36,pointerEvents:"none"}}>
          <div style={{
            position:"absolute",bottom:8,left:12,
            background:"rgba(6,10,24,0.80)",backdropFilter:"blur(12px)",
            border:"1px solid rgba(255,255,255,0.10)",borderRadius:10,
            padding:"4px 10px",
          }}>
            <span style={{fontSize:10,fontWeight:700,color:"rgba(147,197,253,0.8)",letterSpacing:"0.08em",textTransform:"uppercase"}}>
              {filtered.length} clinic{filtered.length!==1?"s":""} near you
            </span>
          </div>
        </div>
      </div>

      {/* ── Clinic cards list ── */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
        <AnimatePresence>
          {filtered.map((clinic,i)=>(
            <motion.div key={clinic.id}
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
              transition={{delay:i*0.06,duration:0.4,ease:[0.16,1,0.3,1]}}
              className={`glass-card rounded-[20px] overflow-hidden card-hover ${selected===clinic.id?"border-glow-blue":""}`}
              style={{border: selected===clinic.id?"1px solid rgba(59,130,246,0.50)":"1px solid rgba(255,255,255,0.08)"}}
            >
              {/* Main row */}
              <div className="p-4 cursor-pointer" onClick={()=>setSelected(selected===clinic.id?null:clinic.id)}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{background:"rgba(59,130,246,0.12)",border:"1px solid rgba(59,130,246,0.22)"}}>
                    <MapPin style={{width:16,height:16,color:"rgb(147,197,253)"}}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[14px] font-bold text-white leading-tight">{clinic.name}</p>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className={`badge ${STATUS_BADGE[clinic.status]||"badge-pending"}`}>{clinic.status}</span>
                        <ChevronDown style={{width:13,height:13,color:"rgba(255,255,255,0.30)",transform:selected===clinic.id?"rotate(180deg)":"none",transition:"transform 0.2s"}}/>
                      </div>
                    </div>
                    <p className="text-caption mt-0.5 truncate" style={{color:"rgba(255,255,255,0.45)"}}>{clinic.address}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-caption font-semibold" style={{color:"rgba(255,255,255,0.55)"}}>📍 {clinic.distance}</span>
                      <span className="text-caption" style={{color:"rgba(255,255,255,0.25)"}}>·</span>
                      <span className="text-caption font-medium" style={{color: clinic.type==="Chain"?"rgba(147,197,253,0.7)":"rgba(110,231,183,0.7)"}}>{clinic.type}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {selected===clinic.id && (
                  <motion.div
                    initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}
                    exit={{height:0,opacity:0}} transition={{duration:0.25}}
                    className="px-4 pb-4"
                    style={{borderTop:"1px solid rgba(255,255,255,0.07)"}}
                  >
                    <div className="pt-3 space-y-3">
                      {/* Services */}
                      <div>
                        <p className="text-label mb-2" style={{color:"rgba(255,255,255,0.35)"}}>Services Available</p>
                        <div className="flex flex-wrap gap-1.5">
                          {clinic.services.map(s=>(
                            <span key={s}
                              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
                              style={{background:"rgba(16,185,129,0.12)",border:"1px solid rgba(16,185,129,0.25)",color:"rgb(110,231,183)"}}>
                              <CheckCircle style={{width:9,height:9}}/>{s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      {clinic.notes && (
                        <p className="text-caption leading-relaxed" style={{color:"rgba(255,255,255,0.42)"}}>
                          📋 {clinic.notes}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <a href={`https://maps.apple.com/?q=${encodeURIComponent(clinic.address)}`}
                          target="_blank" rel="noreferrer"
                          className="flex-1 h-9 rounded-xl flex items-center justify-center gap-1.5 text-[12px] font-bold card-hover"
                          style={{background:"linear-gradient(135deg,rgba(59,130,246,0.20) 0%,rgba(37,99,235,0.28) 100%)",border:"1px solid rgba(59,130,246,0.32)",color:"rgb(147,197,253)"}}>
                          <Navigation style={{width:12,height:12}}/> Apple Maps
                        </a>
                        <a href={`https://maps.google.com/?q=${encodeURIComponent(clinic.address)}`}
                          target="_blank" rel="noreferrer"
                          className="flex-1 h-9 rounded-xl flex items-center justify-center gap-1.5 text-[12px] font-bold card-hover"
                          style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.10)",color:"rgba(255,255,255,0.72)"}}>
                          <Navigation style={{width:12,height:12}}/> Google Maps
                        </a>
                        <a href={`tel:${clinic.phone}`}
                          className="w-9 h-9 rounded-xl flex items-center justify-center card-hover"
                          style={{background:"rgba(16,185,129,0.14)",border:"1px solid rgba(16,185,129,0.28)"}}>
                          <Phone style={{width:14,height:14,color:"rgb(110,231,183)"}}/>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
