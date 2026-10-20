import { Redirect } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { PORTAL_HOME } from "@/lib/portalRoutes";
import { UserRound, BriefcaseBusiness, ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export default function Login() {
  const { role, login } = useAuth();
  if (role) return <Redirect to={PORTAL_HOME[role]} />;

  return (
    <div className="aurora-bg min-h-[100dvh] flex items-center justify-center p-6">
      <div className="w-full max-w-[550px]">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3"><BrandLogo large /></div>
          <p className="mac-login-eyebrow">CaseTrack</p>
          <h1 className="text-[28px] font-bold tracking-tight">Choose your portal</h1>
          <p className="text-sm text-muted-foreground mt-2">Separate workspaces for examinees and case administrators.</p>
        </div>
        <div className="portal-choice-grid">
          <button type="button" className="portal-choice portal-choice-examinee" onClick={() => login("applicant")}>
            <span className="portal-choice-icon"><UserRound size={22} /></span>
            <strong>Examinee portal</strong>
            <span>Case overview, documents, forms, deadlines, and assigned clinic map.</span>
            <span className="portal-choice-arrow">Open portal <ArrowUpRight size={16} /></span>
          </button>
          <button type="button" className="portal-choice portal-choice-admin" onClick={() => login("admin")}>
            <span className="portal-choice-icon"><BriefcaseBusiness size={22} /></span>
            <strong>Admin portal</strong>
            <span>Case management, invitations, and clinic assignments.</span>
            <span className="portal-choice-arrow">Open portal <ArrowUpRight size={16} /></span>
          </button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-5">
          Preview workspaces only. Real sign-in, examinee-level permissions, and shared case access are not connected.
        </p>
      </div>
    </div>
  );
}
