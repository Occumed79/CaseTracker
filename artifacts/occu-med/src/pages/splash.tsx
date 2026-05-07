import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/login");
    }, 2500);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-[100dvh] aurora-bg flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card p-8 rounded-3xl glow-blue flex flex-col items-center"
      >
        <img src="/occu-med-logo.png" alt="Occu-Med Logo" className="w-24 h-24 mb-6" />
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Occu-Med CaseTrack</h1>
        <p className="text-muted-foreground text-sm">Medical Readiness Platform</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12"
      >
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    </div>
  );
}
