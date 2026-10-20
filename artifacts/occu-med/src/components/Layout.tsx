import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  CheckSquare,
  UploadCloud,
  MessageSquare,
  MoreHorizontal,
  LayoutDashboard,
  Users,
  UserPlus,
  PanelLeft,
  Bell,
  FileText,
  Clock,
  MapPin,
  Settings,
  UserRound,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Toaster } from "@/components/ui/toaster";

export function Layout({ children }: { children: ReactNode }) {
  const { role } = useAuth();
  const [location] = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  if (location === "/splash" || location === "/login" || !role)
    return <>{children}</>;
  const primary =
    role === "applicant"
      ? [
          { href: "/", label: "Overview", icon: Home },
          { href: "/tasks", label: "Tasks", icon: CheckSquare },
          { href: "/uploads", label: "Uploads", icon: UploadCloud },
          { href: "/messages", label: "Messages", icon: MessageSquare },
        ]
      : [
          { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
          { href: "/admin/cases", label: "Cases", icon: Users },
          { href: "/admin/invites", label: "Invites", icon: UserPlus },
          { href: "/messages", label: "Messages", icon: MessageSquare },
        ];
  const resources = [
    { href: "/timeline", label: "Case activity", icon: Clock },
    { href: "/eforms", label: "Authorization forms", icon: FileText },
    { href: "/map", label: "Assigned clinic", icon: MapPin },
    { href: "/more", label: "All resources", icon: MoreHorizontal },
  ];
  const preferences = [
    { href: "/profile", label: "Profile", icon: UserRound },
    { href: "/settings", label: "Settings", icon: Settings },
  ];
  // Dashboard must not remain selected on its nested Cases and Invites routes.
  const active = (href: string) =>
    location === href ||
    (href === "/settings" && location.startsWith("/settings/"));
  const title =
    [...primary, ...resources, ...preferences].find((link) => active(link.href))
      ?.label ??
    location.split("/").filter(Boolean).pop()?.replaceAll("-", " ") ??
    "CaseTrack";
  return (
    <div className={`mac-app ${sidebarVisible ? "" : "sidebar-hidden"}`}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <aside
        id="app-sidebar"
        className="mac-sidebar"
        aria-label="Application sidebar"
        inert={!sidebarVisible}
      >
        <Link href={role === "admin" ? "/admin" : "/"} className="mac-brand">
          <BrandLogo />
          <div>
            <strong>CaseTrack</strong>
            <span>Occu-Med</span>
          </div>
        </Link>
        <nav aria-label="Main navigation">
          {[
            { label: "Workspace", links: primary },
            { label: "Resources", links: resources },
            { label: "Preferences", links: preferences },
          ].map((group) => (
            <div className="mac-nav-group" key={group.label}>
              <p className="mac-nav-caption">{group.label}</p>
              {group.links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={active(href) ? "page" : undefined}
                  className={`mac-nav-item ${active(href) ? "is-selected" : ""}`}
                >
                  <Icon size={18} strokeWidth={1.75} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="mac-sidebar-footer">
          <span className="mac-avatar">
            <UserRound size={17} />
          </span>
          <div>
            <strong>
              {role === "admin" ? "Case manager" : "Applicant portal"}
            </strong>
            <span>Browser workspace</span>
          </div>
        </div>
      </aside>
      <div className="mac-workspace">
        <header className="mac-toolbar">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="mac-icon-button sidebar-toggle"
              onClick={() => setSidebarVisible((v) => !v)}
              aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
              aria-expanded={sidebarVisible}
              aria-controls="app-sidebar"
              title={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
            >
              <PanelLeft size={20} />
            </button>
            <div className="mac-toolbar-title">
              <strong>{title}</strong>
              <span>Medical readiness</span>
            </div>
          </div>
          <Link
            href="/reminders"
            className="mac-icon-button"
            aria-label="Reminders"
            title="Reminders"
          >
            <Bell size={19} />
          </Link>
        </header>
        <main id="main-content" tabIndex={-1} className="mac-content">
          {children}
        </main>
      </div>
      <nav className="mac-mobile-nav" aria-label="Mobile navigation">
        {[
          ...primary,
          { href: "/more", label: "More", icon: MoreHorizontal },
        ].map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={active(href) ? "page" : undefined}
            className={active(href) ? "is-selected" : ""}
          >
            <Icon size={21} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <Toaster />
    </div>
  );
}
