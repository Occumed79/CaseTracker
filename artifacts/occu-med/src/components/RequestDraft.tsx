import { FormEvent, useEffect, useState } from "react";
import {
  CasePicker,
  EmptyCase,
  WorkspacePage,
} from "@/components/CaseWorkspace";
import { useCases } from "@/contexts/CaseContext";
export function RequestDraft({ extension = false }: { extension?: boolean }) {
  const { selectedCase: c } = useCases();
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    setDate("");
    setDetails("");
    setNotice("");
  }, [c?.id]);
  async function copy(event: FormEvent) {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(
        `${extension ? "Extension request" : "Phone appointment request"}\nCase: ${c?.id}\n${extension ? "Requested deadline" : "Preferred date/time and timezone"}: ${date}\n${details}`,
      );
      setNotice(
        "Request copied. Send it through your established case-manager contact channel; it has not been submitted by this app.",
      );
    } catch {
      setNotice(
        "Copy is unavailable in this browser. Copy the entered details manually; no request has been submitted.",
      );
    }
  }
  return (
    <WorkspacePage
      title={extension ? "Extension request" : "Phone appointment request"}
    >
      <CasePicker />
      {!c ? (
        <EmptyCase />
      ) : (
        <form onSubmit={copy} className="mac-panel panel-body space-y-5">
          <p className="text-sm text-muted-foreground">
            {extension
              ? "If you need more time, contact your case manager with the reason and relevant provider availability. An extension must be reviewed under the applicable client protocol."
              : "Prepare your request, then send it through your established case-manager contact channel."}
          </p>
          <label className="workspace-field">
            {extension
              ? "Requested new deadline"
              : "Preferred date/time and timezone"}
            <input
              required
              className="glass-input h-10"
              type={extension ? "date" : "text"}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="workspace-field">
            {extension
              ? "Reason and provider availability"
              : "Reason for the call"}
            <textarea
              required
              className="glass-input min-h-28 p-3"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </label>
          <button type="submit" className="mac-primary-button">
            Copy request text
          </button>
          {notice && (
            <p role="status" className="text-sm text-muted-foreground">
              {notice}
            </p>
          )}
        </form>
      )}
    </WorkspacePage>
  );
}
