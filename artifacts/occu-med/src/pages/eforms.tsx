import { useState } from "react";
import { FileText, ArrowLeft, ExternalLink, Download } from "lucide-react";
import { OCCU_MED_FORMS } from "@/data/forms";
import { WorkspacePage } from "@/components/CaseWorkspace";
export default function EForms() {
  const [active, setActive] = useState<string | null>(null);
  const form = OCCU_MED_FORMS.find((f) => f.id === active);
  if (form)
    return (
      <WorkspacePage title={form.name} description={form.printedTitle}>
        <button
          type="button"
          className="mac-demo-button px-4"
          onClick={() => setActive(null)}
        >
          <ArrowLeft size={16} />
          All forms
        </button>
        <div className="form-reference-note">
          <strong>Reference copy</strong>
          <p>{form.referenceNote}</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <a
            href={form.file}
            className="mac-primary-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} />
            Open PDF
          </a>
          <a href={form.file} className="mac-demo-button px-4" download>
            <Download size={16} />
            Download reference
          </a>
        </div>
        <iframe
          className="form-pdf-preview"
          src={form.file}
          title={form.printedTitle}
        />
      </WorkspacePage>
    );
  return (
    <WorkspacePage
      title="Occu-Med authorization forms"
      description="Reference documents from the Occu-Med authorization packet."
    >
      <p className="text-sm text-muted-foreground">
        The form wording is retained from the source packet; the logo is
        updated. These are reference copies, not assigned or completed
        paperwork. Use the authorization issued for the specific case.
      </p>
      <div className="space-y-4">
        {OCCU_MED_FORMS.map((f) => (
          <section className="mac-panel panel-body space-y-4" key={f.id}>
            <div className="flex gap-3 items-start">
              <FileText size={22} className="text-primary shrink-0" />
              <div className="min-w-0">
                <h2 className="font-semibold">{f.name}</h2>
                {f.printedTitle !== f.name && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Printed title: {f.printedTitle}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{f.description}</p>
            <p className="text-sm">{f.completion}</p>
            <button
              type="button"
              className="mac-primary-button"
              onClick={() => setActive(f.id)}
            >
              View form
            </button>
          </section>
        ))}
      </div>
    </WorkspacePage>
  );
}
