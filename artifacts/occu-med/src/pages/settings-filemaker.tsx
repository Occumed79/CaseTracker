import { Link } from "wouter";
import { WorkspacePage } from "@/components/CaseWorkspace";
import { useAuth } from "@/contexts/AuthContext";
import { ADMIN_PATHS, EXAMINEE_PATHS } from "@/lib/portalRoutes";

export default function FilemakerSettings() {
  const { role } = useAuth();
  return (
    <WorkspacePage title="FileMaker connection">
      <Link className="mac-text-link" href={role === "admin" ? ADMIN_PATHS.settings : EXAMINEE_PATHS.settings}>
        Back to settings
      </Link>
      <section className="mac-panel panel-body space-y-4">
        <h2 className="font-semibold">Not connected</h2>
        <p className="text-sm text-muted-foreground">
          No FileMaker connection is configured for this workspace. Case entries are stored in
          this browser and are not synchronized with OMIS or a shared case database.
        </p>
        <p className="text-sm text-muted-foreground">
          No connection test has been run, and no case records have been imported.
        </p>
      </section>
    </WorkspacePage>
  );
}
