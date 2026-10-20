import { Link } from "wouter";
import { useCases } from "@/contexts/CaseContext";
import { CasePicker, WorkspacePage } from "@/components/CaseWorkspace";
export default function AdminDashboard() {
  const { cases } = useCases();
  const metrics = [
    { label: "Cases", value: cases.length },
    {
      label: "RDQ follow-up",
      value: cases.filter((c) => c.status === "RDQ follow-up").length,
    },
    {
      label: "Medical review",
      value: cases.filter((c) => c.status === "Medical review").length,
    },
    {
      label: "Recommendation issued",
      value: cases.filter((c) => c.status === "Placement recommendation issued")
        .length,
    },
  ];
  const events = cases
    .flatMap((c) => c.events.map((e) => ({ ...e, caseId: c.id })))
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 10);
  return (
    <WorkspacePage
      title="Case manager overview"
      description="Counts and activity reflect the cases in this workspace."
    >
      <CasePicker />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <section key={m.label} className="mac-panel panel-body">
            <p className="text-3xl font-semibold">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-2">{m.label}</p>
          </section>
        ))}
      </div>
      <section className="mac-panel">
        <div className="panel-heading">
          <h2>Recent activity</h2>
          <Link href="/admin/cases" className="mac-text-link">
            Manage cases
          </Link>
        </div>
        {events.length ? (
          <ul className="case-requirement-list">
            {events.map((e) => (
              <li key={e.id}>
                <p className="text-sm">
                  {e.caseId} · {e.text}
                </p>
                <time className="text-xs text-muted-foreground">
                  {new Date(e.at).toLocaleString()}
                </time>
              </li>
            ))}
          </ul>
        ) : (
          <div className="panel-body text-muted-foreground text-sm">
            No case activity has been recorded.
          </div>
        )}
      </section>
    </WorkspacePage>
  );
}
