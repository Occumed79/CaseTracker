import { Link } from "wouter";
import { WorkspacePage } from "@/components/CaseWorkspace";
export default function FilemakerSettings() {
  return (
    <WorkspacePage title="FileMaker connection">
      <Link className="mac-text-link" href="/settings">
        Back to settings
      </Link>
      <section className="mac-panel panel-body space-y-4">
        <h2 className="font-semibold">Not connected</h2>
        <p className="text-sm text-muted-foreground">
          No FileMaker connection is configured for this workspace. Case entries
          are stored in this browser and are not synchronized with OMIS or a
          shared case database.
        </p>
        <p className="text-sm text-muted-foreground">
          No connection test has been run, and no case records have been
          imported.
        </p>
      </section>
    </WorkspacePage>
  );
}
