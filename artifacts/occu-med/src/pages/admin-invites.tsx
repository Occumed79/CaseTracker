import { WorkspacePage } from "@/components/CaseWorkspace";
export default function AdminInvites() {
  return (
    <WorkspacePage title="Invitations">
      <section className="mac-panel panel-body space-y-3">
        <h2 className="font-semibold">
          No account-invitation service connected
        </h2>
        <p className="text-sm text-muted-foreground">
          This workspace cannot issue applicant access codes or send
          invitations. A generated demonstration code would not grant access to
          a real case.
        </p>
      </section>
    </WorkspacePage>
  );
}
