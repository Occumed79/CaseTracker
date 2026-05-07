import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Home, CheckSquare, UploadCloud, MessageSquare, MoreHorizontal, LayoutDashboard, Users, UserPlus } from "lucide-react";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

export function Layout({ children }: { children: ReactNode }) {
  const { role } = useAuth();
  const [location] = useLocation();

  if (location === "/splash" || location === "/login") {
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
      <header className="sticky top-0 z-50 glass-card border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center p-1 glow-blue">
            <img src="/occu-med-logo.png" alt="Occu-Med" className="w-full h-full object-contain" />
          </div>
          <span className="font-semibold tracking-tight">Occu-Med CaseTrack</span>
        </div>
      </header>

      <main className="flex-1 pb-20 relative z-10">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/10 pb-safe pt-2 px-2 flex justify-around">
        {links.map((link) => {
          const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${isActive ? "text-primary glow-blue bg-white/5" : "text-muted-foreground hover:text-white"}`} data-testid={`nav-${link.label.toLowerCase()}`}>
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <Toaster />
    </div>
  );
}
