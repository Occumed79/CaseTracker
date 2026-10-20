import { Link } from "wouter";
import { WorkspacePage } from "@/components/CaseWorkspace";
import { useAuth } from "@/contexts/AuthContext";
import { ADMIN_PATHS, EXAMINEE_PATHS } from "@/lib/portalRoutes";

export default function Settings() {
  const { role, logout } = useAuth();
  const path = role === "admin" ? ADMIN_PATHS.filemaker : EXAMINEE_PATHS.filemaker;
  return (
    <WorkspacePage title="Settings">
      <section className="mac-panel panel-body space-y-4">
        <h2 className="font-semibold">{role === "admin" ? "Admin workspace" : "Examinee workspace"}</h2>
        <p className="text-sm text-muted-foreground">
          Case entries are saved in this browser. The app uses your system font and respects the browser's
          reduced-motion and increased-contrast preferences.
        </p>
        <Link href={path} className="mac-text-link">FileMaker connection status</Link>
        <div className="pt-4 border-t">
          <button type="button" className="mac-demo-button px-4" onClick={logout}>Sign out / switch portal</button>
        </div>
      </section>
    </WorkspacePage>
  );
}
