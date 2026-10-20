import { useCases } from "@/contexts/CaseContext";
import {
  CasePicker,
  EmptyCase,
  WorkspacePage,
} from "@/components/CaseWorkspace";
export default function Profile() {
  const { selectedCase: c } = useCases();
  return (
    <WorkspacePage title="Case profile">
      <CasePicker />
      {!c ? (
        <EmptyCase />
      ) : (
        <section className="mac-panel panel-body">
          <dl className="case-fields-grid">
            {[
              ["Applicant", c.name],
              ["Case ID", c.id],
              ["Employer", c.employer],
              ["Job title", c.position],
              ["Exam type", c.examType],
              ["Status", c.status],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-muted-foreground">{k}</dt>
                <dd className="text-sm mt-1 break-words">
                  {v || "Not entered"}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </WorkspacePage>
  );
}
