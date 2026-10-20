import { Link } from "wouter";
import { useCases } from "@/contexts/CaseContext";
import {
  CasePicker,
  CaseRequirements,
  EmptyCase,
  WorkspacePage,
} from "@/components/CaseWorkspace";
export default function Dashboard() {
  const { selectedCase: c } = useCases();
  return (
    <WorkspacePage title="Case overview">
      <CasePicker />
      {!c ? (
        <EmptyCase />
      ) : (
        <>
          <section className="mac-panel panel-body">
            <p className="eyebrow">Case {c.id}</p>
            <h2 className="text-2xl font-bold mb-2">{c.name}</h2>
            <p className="text-muted-foreground text-sm">
              {[c.employer, c.position, c.examType]
                .filter(Boolean)
                .join(" · ") || "No examination details entered"}
            </p>
            <div className="flex flex-wrap gap-3 items-center mt-5">
              <span className="badge badge-pending">{c.status}</span>
              {c.deadline && (
                <span className="text-xs">Deadline: {c.deadline}</span>
              )}
            </div>
          </section>
          <CaseRequirements />
          <div className="flex flex-wrap gap-3">
            <Link href="/eforms" className="mac-primary-button">
              Authorization forms
            </Link>
            <Link href="/rdqa" className="mac-demo-button px-4">
              About RDQA
            </Link>
            <Link href="/timeline" className="mac-demo-button px-4">
              Case activity
            </Link>
          </div>
        </>
      )}
    </WorkspacePage>
  );
}
