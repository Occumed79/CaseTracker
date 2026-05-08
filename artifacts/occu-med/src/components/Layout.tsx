import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Home, CheckSquare, UploadCloud, MessageSquare, MoreHorizontal, LayoutDashboard, Users, UserPlus } from "lucide-react";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

export function Layout({ children }: { children: ReactNode }) {
  const { role } = useAuth();
  const [location] = useLocation();

  if (location === "/splash" || location === "/login" || !role) {
    return <>{children}</>;
  }

  const isApplicant = role === "applicant";

  const applicantLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/uploads", label: "Uploads", icon: UploadCloud },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/more", label: "More", icon: MoreHorizontal },
  ];

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/cases", label: "Cases", icon: Users },
    { href: "/admin/invites", label: "Invites", icon: UserPlus },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/more", label: "More", icon: MoreHorizontal },
  ];

  const links = isApplicant ? applicantLinks : adminLinks;

  return (
    <div className="min-h-[100dvh] flex flex-col aurora-bg text-foreground">
      {/* ── Glassy Header ── */}
      <header className="sticky top-0 z-50 app-header px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo container — glass badge with blue glow */}
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center p-1.5 glow-blue-sm"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(59,130,246,0.35)",
              backdropFilter: "blur(12px)",
            }}>
            <img src="/occu-med-logo.png" alt="Occu-Med" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight text-sm leading-tight block">Occu-Med</span>
            <span className="text-[10px] font-medium tracking-widest uppercase"
              style={{ color: "rgba(147,197,253,0.8)" }}>CaseTrack</span>
          </div>
        </div>

        {/* Right side — notification dot placeholder */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-blue-400 pulse-blue absolute -top-0.5 -right-0.5" />
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <span className="text-white/50 text-xs font-bold">●●●</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 pb-24 relative z-10">
        {children}
      </main>

      {/* ── Glassy Bottom Nav ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bottom-nav pb-safe px-2 pt-2 pb-3 flex justify-around">
        {links.map((link) => {
          const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-200 ${
                isActive
                  ? "nav-item-active"
                  : "text-white/35 hover:text-white/60"
              }`}
            >
              {/* Active tab gets pill background */}
              <div className={`relative flex items-center justify-center w-7 h-7 rounded-xl transition-all duration-200 ${
                isActive ? "glow-blue-sm" : ""
              }`}
                style={isActive ? {
                  background: "rgba(59,130,246,0.18)",
                  border: "1px solid rgba(59,130,246,0.3)",
                } : {}}>
                <Icon className={`w-4.5 h-4.5 ${isActive ? "text-blue-300" : ""}`} style={{ width: "18px", height: "18px" }} />
              </div>
              <span className={`text-[9.5px] font-semibold tracking-wide ${isActive ? "text-blue-300" : ""}`}>
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
