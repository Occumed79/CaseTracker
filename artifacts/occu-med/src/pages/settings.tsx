import { Link } from "wouter";
import { WorkspacePage } from "@/components/CaseWorkspace";
export default function Settings() {
  return (
    <WorkspacePage title="Settings">
      <section className="mac-panel panel-body space-y-4">
        <h2 className="font-semibold">Workspace</h2>
        <p className="text-sm text-muted-foreground">
          Case entries are saved in this browser. The app uses your system font
          and respects the browser’s reduced-motion and increased-contrast
          preferences.
        </p>
        <Link href="/settings/filemaker" className="mac-text-link">
          FileMaker connection status
        </Link>
      </section>
    </WorkspacePage>
  );
}
