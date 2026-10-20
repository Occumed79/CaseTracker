import { useEffect, useState } from "react";
import { useCases } from "@/contexts/CaseContext";
import {
  CasePicker,
  EmptyCase,
  WorkspacePage,
} from "@/components/CaseWorkspace";
export default function Messages() {
  const { selectedCase: c } = useCases();
  const [text, setText] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    setText("");
    setNotice("");
  }, [c?.id]);
  return (
    <WorkspacePage
      title="Messages"
      description="No messaging service is connected."
    >
      <CasePicker />
      {!c ? (
        <EmptyCase />
      ) : (
        <section className="mac-panel panel-body space-y-4">
          <h2 className="font-semibold">Draft for case {c.id}</h2>
          <p className="text-sm text-muted-foreground">
            No messages have been received through this workspace. You can
            prepare text here to copy into your established communication
            channel.
          </p>
          <label className="workspace-field">
            Message draft
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setNotice("");
              }}
              className="glass-input p-3 min-h-36"
            />
          </label>
          <button
            className="mac-primary-button"
            type="button"
            disabled={!text.trim()}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(text);
                setNotice("Draft copied. It has not been sent.");
              } catch {
                setNotice(
                  "Copy is unavailable. Select and copy the draft text manually.",
                );
              }
            }}
          >
            Copy draft
          </button>
          {notice && (
            <p role="status" className="text-sm text-muted-foreground">
              {notice}
            </p>
          )}
        </section>
      )}
    </WorkspacePage>
  );
}
