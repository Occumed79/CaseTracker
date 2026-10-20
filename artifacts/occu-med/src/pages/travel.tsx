import {
  CasePicker,
  EmptyCase,
  WorkspacePage,
} from "@/components/CaseWorkspace";
import { useCases } from "@/contexts/CaseContext";
export default function TravelReadiness() {
  const { selectedCase: c } = useCases();
  return (
    <WorkspacePage title="Travel requirements">
      <CasePicker />
      {!c ? (
        <EmptyCase />
      ) : (
        <section className="mac-panel panel-body">
          <h2 className="font-semibold">No travel requirements recorded</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Passport, vaccination, and deployment requirements must come from
            the applicable assignment and case instructions. No travel
            eligibility is inferred from this workspace.
          </p>
        </section>
      )}
    </WorkspacePage>
  );
}
