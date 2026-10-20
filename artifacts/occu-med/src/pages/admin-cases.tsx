import { FormEvent, useState } from "react";
import { Search, Plus, Pencil } from "lucide-react";
import {
  CASE_STATUSES,
  CaseRecord,
  CaseStatus,
  useCases,
} from "@/contexts/CaseContext";
import { CasePicker, WorkspacePage } from "@/components/CaseWorkspace";
const fresh = () => ({
  id: "",
  name: "",
  employer: "",
  position: "",
  examType: "",
  status: "Not assigned" as CaseStatus,
  deadline: "",
  requirements: "",
  clinic: "",
});
export default function AdminCases() {
  const { cases, selectedCase, saveCase, selectCase } = useCases();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState(fresh);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const field = (name: keyof ReturnType<typeof fresh>, value: string) =>
    setDraft((d) => ({ ...d, [name]: value }));
  function edit(record: CaseRecord) {
    setDraft({ ...record, requirements: record.requirements.join("\n") });
    setEditing(true);
    setError("");
    setOpen(true);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    const id = draft.id.trim();
    if (!id || !draft.name.trim()) {
      setError("Enter a case ID and applicant name.");
      return;
    }
    if (
      !editing &&
      cases.some((c) => c.id.toLowerCase() === id.toLowerCase())
    ) {
      setError(
        "That case ID already exists. Open the existing case to edit it.",
      );
      return;
    }
    saveCase({
      ...draft,
      id,
      name: draft.name.trim(),
      employer: draft.employer.trim(),
      position: draft.position.trim(),
      examType: draft.examType.trim(),
      clinic: draft.clinic.trim(),
      requirements: draft.requirements
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    });
    setOpen(false);
    setDraft(fresh());
  }
  const filtered = cases.filter(
    (c) =>
      (!status || c.status === status) &&
      `${c.id} ${c.name} ${c.employer}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <WorkspacePage
      title="Cases"
      description="Add or update case information from your authorized source."
    >
      <CasePicker />
      <div className="flex flex-wrap gap-3 justify-between">
        <label className="relative flex-1 min-w-[180px]">
          <Search size={16} className="absolute left-3 top-3" />
          <input
            aria-label="Search cases"
            placeholder="Search by name, case ID, or employer"
            className="glass-input case-search-input w-full h-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <select
          aria-label="Filter case status"
          className="glass-input h-10 max-w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          {CASE_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button
          className="mac-primary-button"
          type="button"
          onClick={() => {
            setDraft(fresh());
            setEditing(false);
            setError("");
            setOpen(true);
          }}
        >
          <Plus size={16} />
          Add case
        </button>
      </div>
      {open && (
        <form className="mac-panel panel-body space-y-5" onSubmit={submit}>
          <h2 className="font-semibold">
            {editing ? "Edit case" : "Add case"}
          </h2>
          <div className="case-fields-grid">
            {(
              [
                ["id", "Case ID"],
                ["name", "Applicant name"],
                ["employer", "Employer"],
                ["position", "Job title"],
                ["examType", "Exam type"],
                ["clinic", "Assigned clinic / address"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="workspace-field">
                {label}
                <input
                  className="glass-input h-10"
                  required={key === "id" || key === "name"}
                  disabled={key === "id" && editing}
                  value={draft[key]}
                  onChange={(e) => field(key, e.target.value)}
                />
              </label>
            ))}
            <label className="workspace-field">
              Status
              <select
                className="glass-input h-10"
                aria-label="Case status"
                value={draft.status}
                onChange={(e) => field("status", e.target.value)}
              >
                {CASE_STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="workspace-field">
              Case deadline
              <input
                type="date"
                className="glass-input h-10"
                value={draft.deadline}
                onChange={(e) => field("deadline", e.target.value)}
              />
            </label>
          </div>
          <label className="workspace-field">
            Case-specific follow-up requirements
            <textarea
              className="glass-input p-3 min-h-28"
              value={draft.requirements}
              onChange={(e) => field("requirements", e.target.value)}
              placeholder="Enter the requirements from the actual case notice, one per line."
            />
          </label>
          {error && (
            <p role="alert" className="text-destructive">
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <button type="submit" className="mac-primary-button">
              Save case
            </button>
            <button
              type="button"
              className="mac-demo-button px-4"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {!filtered.length ? (
        <section className="mac-panel empty-case">
          <h2 className="font-semibold">
            {cases.length ? "No matching cases" : "No cases have been added"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {cases.length
              ? "Change the search or status filter."
              : "The sample applicants have been removed. Add a case to begin."}
          </p>
        </section>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <section
              key={c.id}
              className={`mac-panel panel-body ${selectedCase?.id === c.id ? "selected-case" : ""}`}
            >
              <div className="flex flex-wrap gap-3 justify-between">
                <button
                  type="button"
                  className="text-left min-w-0"
                  onClick={() => selectCase(c.id)}
                  aria-pressed={selectedCase?.id === c.id}
                >
                  <h2 className="font-semibold break-words">{c.name}</h2>
                  <p className="text-xs text-muted-foreground mt-1 break-words">
                    {c.id}
                    {c.employer ? ` · ${c.employer}` : ""}
                  </p>
                </button>
                <button
                  type="button"
                  className="mac-demo-button px-3"
                  onClick={() => edit(c)}
                  aria-label={`Edit ${c.id}`}
                >
                  <Pencil size={14} />
                  Edit
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="badge badge-pending">{c.status}</span>
                {selectedCase?.id === c.id && (
                  <span className="badge">Selected</span>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </WorkspacePage>
  );
}
