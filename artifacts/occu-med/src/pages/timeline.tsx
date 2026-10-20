import { useCases } from "@/contexts/CaseContext";
import {
  CasePicker,
  EmptyCase,
  WorkspacePage,
} from "@/components/CaseWorkspace";
export default function Timeline() {
  const { selectedCase: c } = useCases();
  return (
    <WorkspacePage
      title="Case activity"
      description="Recorded actions for the selected case."
    >
      <CasePicker />
      {!c ? (
        <EmptyCase />
      ) : (
        <section className="mac-panel">
          <ul className="case-requirement-list">
            {[...c.events].reverse().map((e) => (
              <li key={e.id}>
                <p className="text-sm">{e.text}</p>
                <time className="text-xs text-muted-foreground">
                  {new Date(e.at).toLocaleString()}
                </time>
              </li>
            ))}
          </ul>
        </section>
      )}
    </WorkspacePage>
  );
}
