import { MapPin } from "lucide-react";
import { useCases } from "@/contexts/CaseContext";
import {
  CasePicker,
  EmptyCase,
  WorkspacePage,
} from "@/components/CaseWorkspace";
export default function ClinicMap() {
  const { selectedCase: c } = useCases();
  return (
    <WorkspacePage
      title="Assigned clinic"
      description="Clinic details entered for the selected case."
    >
      <CasePicker />
      {!c ? (
        <EmptyCase />
      ) : (
        <section className="mac-panel panel-body space-y-4">
          <MapPin size={25} className="text-primary" />
          {c.clinic ? (
            <>
              <h2 className="font-semibold break-words">{c.clinic}</h2>
              <p className="text-sm text-muted-foreground">
                Confirm appointment details in the case-specific Authorization
                for Examination.
              </p>
              <a
                className="mac-primary-button"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.clinic)}`}
              >
                Open in Maps
              </a>
            </>
          ) : (
            <>
              <h2 className="font-semibold">No clinic assigned</h2>
              <p className="text-sm text-muted-foreground">
                No clinic location has been entered for this case.
              </p>
            </>
          )}
        </section>
      )}
    </WorkspacePage>
  );
}
