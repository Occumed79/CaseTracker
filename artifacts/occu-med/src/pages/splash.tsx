import { useEffect } from "react";
import { useLocation } from "wouter";
import { BrandLogo } from "@/components/BrandLogo";
export default function Splash() {
  const [, navigate] = useLocation();
  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 1000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="aurora-bg min-h-[100dvh] flex flex-col gap-5 items-center justify-center p-6">
      <BrandLogo large />
      <h1 className="text-3xl font-bold">CaseTrack</h1>
      <p className="text-muted-foreground text-sm">Occu-Med case workspace</p>
    </div>
  );
}
