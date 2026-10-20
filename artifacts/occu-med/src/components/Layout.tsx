import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { ADMIN_PATHS, EXAMINEE_PATHS } from "@/lib/portalRoutes";
import {
  Home, CheckSquare, UploadCloud, MessageSquare, MoreHorizontal,
  LayoutDashboard, Users, UserPlus, PanelLeft, Bell, FileText,
  Clock, MapPin, Settings, UserRound, LogOut,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Toaster } from "@/components/ui/toaster";

export function Layout({ children }: { children: ReactNode }) {
  const { role, logout } = useAuth();
  const [location] = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  if (location === "/splash" || location === "/login" || !role)
    return <>{children}</>;

  const admin = role === "admin";
  const primary = admin
    ? [
        { href: ADMIN_PATHS.home, label: "Overview", icon: LayoutDashboard },
        { href: ADMIN_PATHS.cases, label: "Cases", icon: Users },
        { href: ADMIN_PATHS.invites, label: "Invitations", icon: UserPlus },
      ]
    : [
        { href: EXAMINEE_PATHS.home, label: "Overview", icon: Home },
        { href: EXAMINEE_PATHS.tasks, label: "Tasks", icon: CheckSquare },
        { href: EXAMINEE_PATHS.uploads, label: "Documents", icon: UploadCloud },
        { href: EXAMINEE_PATHS.messages, label: "Messages", icon: MessageSquare },
      ];
  const resources = admin
    ? [{ href: ADMIN_PATHS.map, label: "Clinic map", icon: MapPin }]
    : [
        { href: EXAMINEE_PATHS.map, label: "Assigned clinic map", icon: MapPin },
        { href: EXAMINEE_PATHS.forms, label: "Authorization forms", icon: FileText },
        { href: EXAMINEE_PATHS.timeline, label: "Case activity", icon: Clock },
        { href: EXAMINEE_PATHS.more, label: "More resources", icon: MoreHorizontal },
      ];
  const preferences = admin
    ? [{ href: ADMIN_PATHS.settings, label: "Settings", icon: Settings }]
    : [
        { href: EXAMINEE_PATHS.profile, label: "My case profile", icon: UserRound },
        { href: EXAMINEE_PATHS.settings, label: "Settings", icon: Settings },
      ];
  const active = (href: string) =>
    location === href || (href.endsWith("/settings") && location.startsWith(href + "/"));
  const title = [...primary, ...resources, ...preferences].find((link) => active(link.href))?.label ??
    location.split("/").filter(Boolean).pop()?.replaceAll("-", " ") ?? "CaseTrack";

  return (
    <div className={"mac-app " + (sidebarVisible ? "" : "sidebar-hidden")}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <aside id="app-sidebar" className="mac-sidebar" aria-label={admin ? "Admin portal navigation" : "Examinee portal navigation"} inert={!sidebarVisible}>
        <Link href={admin ? ADMIN_PATHS.home : EXAMINEE_PATHS.home} className="mac-brand">
          <BrandLogo />
          <span className="mac-brand-product">CaseTrack</span>
        </Link>
        <p className="mac-portal-name">{admin ? "Admin portal" : "Examinee portal"}</p>
        <nav aria-label="Main navigation">
          {[
            { label: "Workspace", links: primary },
            { label: "Resources", links: resources },
            { label: "Preferences", links: preferences },
          ].map((group) => (
            <div className="mac-nav-group" key={group.label}>
              <p className="mac-nav-caption">{group.label}</p>
              {group.links.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} aria-current={active(href) ? "page" : undefined}
                  className={"mac-nav-item " + (active(href) ? "is-selected" : "")}>
                  <Icon size={18} strokeWidth={1.75} /><span>{label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="mac-sidebar-footer">
          <span className="mac-avatar"><UserRound size={17} /></span>
          <div><strong>{admin ? "Administrative workspace" : "Examinee workspace"}</strong><span>Browser-local demonstration</span></div>
        </div>
        <button type="button" className="mac-signout-button" onClick={logout}>
          <LogOut size={16} /> Sign out / switch portal
        </button>
      </aside>
      <div className="mac-workspace">
        <header className="mac-toolbar">
          <div className="flex items-center gap-3 min-w-0">
            <button type="button" className="mac-icon-button sidebar-toggle"
              onClick={() => setSidebarVisible((v) => !v)}
              aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
              aria-expanded={sidebarVisible} aria-controls="app-sidebar"
              title={sidebarVisible ? "Hide sidebar" : "Show sidebar"}>
              <PanelLeft size={20} />
            </button>
            <div className="mac-toolbar-title"><strong>{title}</strong><span>{admin ? "Admin portal" : "Examinee portal"}</span></div>
          </div>
          {admin ? (
            <Link href={ADMIN_PATHS.cases} className="mac-icon-button" aria-label="Manage cases" title="Manage cases"><Users size={19} /></Link>
          ) : (
            <Link href={EXAMINEE_PATHS.reminders} className="mac-icon-button" aria-label="Reminders" title="Reminders"><Bell size={19} /></Link>
          )}
        </header>
        <main id="main-content" tabIndex={-1} className="mac-content">{children}</main>
      </div>
      <nav className="mac-mobile-nav" aria-label={admin ? "Admin mobile navigation" : "Examinee mobile navigation"}>
        {(admin ? [
          ...primary,
          { href: ADMIN_PATHS.map, label: "Clinic", icon: MapPin },
          { href: ADMIN_PATHS.settings, label: "Settings", icon: Settings },
        ] : [
          ...primary,
          { href: EXAMINEE_PATHS.map, label: "Clinic", icon: MapPin },
          { href: EXAMINEE_PATHS.more, label: "More", icon: MoreHorizontal },
        ]).map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} aria-current={active(href) ? "page" : undefined}
            className={active(href) ? "is-selected" : ""}>
            <Icon size={21} /><span>{label}</span>
          </Link>
        ))}
      </nav>
      <Toaster />
    </div>
  );
}
