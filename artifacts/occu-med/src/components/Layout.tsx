import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Home, CheckSquare, UploadCloud, MessageSquare, MoreHorizontal, LayoutDashboard, Users, UserPlus } from "lucide-react";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";

export function Layout({ children }: { children: ReactNode }) {
  const { role } = useAuth();
  const [location] = useLocation();

  if (location === "/splash" || location === "/login" || !role) return <>{children}</>;

  const isApplicant = role === "applicant";

  const applicantLinks = [
    { href: "/",         label: "Home",     icon: Home },
    { href: "/tasks",    label: "Tasks",    icon: CheckSquare },
    { href: "/uploads",  label: "Uploads",  icon: UploadCloud },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/more",     label: "More",     icon: MoreHorizontal },
  ];
  const adminLinks = [
    { href: "/admin",         label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/cases",   label: "Cases",     icon: Users },
    { href: "/admin/invites", label: "Invites",   icon: UserPlus },
    { href: "/messages",      label: "Messages",  icon: MessageSquare },
    { href: "/more",          label: "More",      icon: MoreHorizontal },
  ];
  const links = isApplicant ? applicantLinks : adminLinks;

  return (
    <div className="min-h-[100dvh] flex flex-col aurora-bg text-foreground">
      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-50 app-header px-4 h-[54px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Logo badge */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center glow-blue-xs flex-shrink-0"
            style={{
              background: "linear-gradient(145deg, rgba(59,130,246,0.22) 0%, rgba(37,99,235,0.12) 100%)",
              border: "1px solid rgba(59,130,246,0.38)",
              padding: "5px",
            }}
          >
            <img src="/occu-med-logo.png" alt="Occu-Med" className="w-full h-full object-contain" />
          </div>
          <div className="leading-none">
            <span className="block text-[13px] font-bold text-white tracking-tight">CaseTrack</span>
            <span className="block text-[9px] font-semibold tracking-[0.15em] uppercase" style={{ color: "rgba(147,197,253,0.65)" }}>by Occu-Med</span>
          </div>
        </div>

        {/* Right — notification indicator */}
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontSize: 15, lineHeight: 1 }}>🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full dot dot-red" style={{ width:7,height:7 }} />
          </div>
        </div>
      </header>

      {/* ═══ MAIN ═══ */}
      <main className="flex-1 pb-28 relative z-10">
        {children}
      </main>

      {/* ═══ FLOATING DOCK NAV ═══ */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bottom-nav px-3 pt-2 pb-[env(safe-area-inset-bottom,12px)] flex justify-around items-center">
        {links.map((link) => {
          const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}
              className="flex flex-col items-center gap-1 relative"
              style={{ minWidth: 48 }}
            >
              <motion.div
                whileTap={{ scale: 0.88 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className={`w-11 h-9 flex items-center justify-center rounded-2xl transition-all duration-250 ${isActive ? "nav-pill-active" : ""}`}
              >
                <Icon
                  style={{
                    width: 20, height: 20,
                    color: isActive ? "hsl(217,100%,70%)" : "rgba(255,255,255,0.32)",
                    filter: isActive ? "drop-shadow(0 0 6px rgba(59,130,246,0.7))" : "none",
                    transition: "all 0.25s ease",
                  }}
                />
              </motion.div>
              <span
                style={{
                  fontSize: 9.5, fontWeight: 600, letterSpacing: "0.04em",
                  color: isActive ? "rgba(147,197,253,0.9)" : "rgba(255,255,255,0.28)",
                  transition: "color 0.25s",
                }}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <Toaster />
    </div>
  );
}
