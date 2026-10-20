import { useCases } from "@/contexts/CaseContext";
import {
  CasePicker,
  EmptyCase,
  WorkspacePage,
} from "@/components/CaseWorkspace";
export default function Reminders() {
  const { selectedCase: c } = useCases();
  return (
    <WorkspacePage title="Case reminders">
      <CasePicker />
      {!c ? (
        <EmptyCase />
      ) : (
        <section className="mac-panel panel-body">
          <h2 className="font-semibold">Case deadline</h2>
          <p className="text-sm text-muted-foreground mt-2">
            {c.deadline
              ? `The recorded deadline for ${c.id} is ${c.deadline}. Check the actual case notice for submission requirements.`
              : "No deadline has been entered for this case."}
          </p>
        </section>
      )}
    </WorkspacePage>
  );
}
