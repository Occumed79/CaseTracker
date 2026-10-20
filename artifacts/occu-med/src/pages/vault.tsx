import { Link } from "wouter";
import {
  CasePicker,
  EmptyCase,
  WorkspacePage,
} from "@/components/CaseWorkspace";
import { useCases } from "@/contexts/CaseContext";
export default function Vault() {
  const { selectedCase: c } = useCases();
  return (
    <WorkspacePage title="Medical records">
      <CasePicker />
      {!c ? (
        <EmptyCase />
      ) : (
        <section className="mac-panel panel-body space-y-4">
          <h2 className="font-semibold">No record service connected</h2>
          <p className="text-sm text-muted-foreground">
            This workspace has not received or stored examination results for
            this case. Request records through the established Occu-Med process.
          </p>
          <Link href="/eforms" className="mac-primary-button">
            Authorization forms
          </Link>
        </section>
      )}
    </WorkspacePage>
  );
}
