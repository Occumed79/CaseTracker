import {
  CasePicker,
  EmptyCase,
  WorkspacePage,
} from "@/components/CaseWorkspace";
import { useCases } from "@/contexts/CaseContext";
export default function Waiver() {
  const { selectedCase: c } = useCases();
  return (
    <WorkspacePage title="Waiver information">
      <CasePicker />
      {!c ? (
        <EmptyCase />
      ) : (
        <section className="mac-panel panel-body">
          <h2 className="font-semibold">No waiver information recorded</h2>
          <p className="text-sm text-muted-foreground mt-2">
            A waiver requirement, submission, or determination has not been
            entered for this case. Refer to the case-specific instructions and
            case manager.
          </p>
        </section>
      )}
    </WorkspacePage>
  );
}
