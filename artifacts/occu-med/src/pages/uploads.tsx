import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FileText, UploadCloud } from "lucide-react";
import { useCases } from "@/contexts/CaseContext";
import {
  CasePicker,
  EmptyCase,
  WorkspacePage,
} from "@/components/CaseWorkspace";
const TYPES = [
  "Authorization for Examination",
  "Authorization for Release of Medical Records",
  "Requested medical information",
  "Examination results",
  "Other case document",
];
export default function Uploads() {
  const { selectedCase: c } = useCases();
  const input = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<
    { name: string; size: number; url: string }[]
  >([]);
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setSelected([]);
    setType("");
    setError("");
  }, [c?.id]);
  useEffect(
    () => () => {
      selected.forEach((f) => URL.revokeObjectURL(f.url));
    },
    [selected],
  );
  function choose(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (
      files.some(
        (f) =>
          !["application/pdf", "image/jpeg", "image/png"].includes(f.type) ||
          f.size > 20 * 1024 * 1024,
      )
    ) {
      setError("Select PDF, JPEG, or PNG files of 20 MB or less.");
      return;
    }
    setError("");
    setSelected(
      files.map((f) => ({
        name: f.name,
        size: f.size,
        url: URL.createObjectURL(f),
      })),
    );
  }
  return (
    <WorkspacePage
      title="Case documents"
      description="Review documents on this device before using your established submission channel."
    >
      <CasePicker />
      {!c ? (
        <EmptyCase />
      ) : (
        <>
          <section className="mac-panel panel-body space-y-4">
            <UploadCloud className="text-primary" size={28} />
            <p className="text-sm text-muted-foreground">
              No document-submission service is connected. Selected files stay
              on this device for this session; they are not uploaded, reviewed,
              or marked complete.
            </p>
            <label className="workspace-field">
              Document type
              <select
                className="glass-input h-10"
                aria-label="Document type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select document type</option>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <input
              aria-label="Choose case documents"
              ref={input}
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              multiple
              onChange={choose}
              className="sr-only"
            />
            <button
              type="button"
              className="mac-primary-button"
              disabled={!type}
              onClick={() => input.current?.click()}
            >
              Select files
            </button>
            {error && (
              <p role="alert" className="text-destructive">
                {error}
              </p>
            )}
          </section>
          <section className="mac-panel">
            <div className="panel-heading">
              <h2>Selected on this device</h2>
            </div>
            {selected.length ? (
              <ul className="case-requirement-list">
                {selected.map((f, i) => (
                  <li key={`${i}-${f.name}`} className="flex gap-3 items-start">
                    <FileText size={18} className="shrink-0" />
                    <div className="min-w-0">
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mac-text-link break-all"
                      >
                        {f.name}
                      </a>
                      <p className="text-xs text-muted-foreground">
                        {type} · {(f.size / 1024).toFixed(1)} KB · Not submitted
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="panel-body text-sm text-muted-foreground">
                No documents selected.
              </p>
            )}
          </section>
        </>
      )}
    </WorkspacePage>
  );
}
