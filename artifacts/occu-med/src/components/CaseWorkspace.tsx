import { ReactNode } from "react";
import { Link } from "wouter";
import { FolderOpen } from "lucide-react";
import { useCases } from "@/contexts/CaseContext";
import { useAuth } from "@/contexts/AuthContext";
export function WorkspacePage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
export function EmptyCase({
  title = "No case selected",
  description = "Case information will appear when a case is added to this workspace.",
}: {
  title?: string;
  description?: string;
}) {
  const { role } = useAuth();
  return (
    <section className="mac-panel empty-case">
      <FolderOpen size={28} />
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      {role === "admin" && (
        <Link href="/admin/cases" className="mac-primary-button">
          Manage cases
        </Link>
      )}
    </section>
  );
}
export function CasePicker() {
  const { cases, selectedCase, selectCase, storageError } = useCases();
  const { role } = useAuth();
  return (
    <div className="workspace-context">
      <div>
        <span>Browser workspace</span>
        <p>
          Cases entered here are saved in this browser. No case-system
          connection is configured.
        </p>
      </div>
      {role === "admin" && cases.length > 0 && (
        <label className="case-picker-label">
          Selected case
          <select
            aria-label="Selected case"
            className="glass-input"
            value={selectedCase?.id ?? ""}
            onChange={(e) => selectCase(e.target.value)}
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} · {c.name}
              </option>
            ))}
          </select>
        </label>
      )}
      {role === "applicant" && selectedCase && (
        <p className="text-xs text-muted-foreground">Case {selectedCase.id} · {selectedCase.name}</p>
      )}
      {storageError && <p role="alert">{storageError}</p>}
    </div>
  );
}
export function CaseRequirements() {
  const { selectedCase } = useCases();
  if (!selectedCase) return <EmptyCase />;
  return (
    <section className="mac-panel">
      <div className="panel-heading">
        <h2>Case-specific follow-up</h2>
      </div>
      {selectedCase.requirements.length ? (
        <ul className="case-requirement-list">
          {selectedCase.requirements.map((r, i) => (
            <li key={`${i}-${r}`}>{r}</li>
          ))}
        </ul>
      ) : (
        <div className="panel-body text-sm text-muted-foreground">
          No follow-up requirements have been entered for this case.
        </div>
      )}
    </section>
  );
}
