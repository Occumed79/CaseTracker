import { Link } from "wouter";
import { CaseRequirements, WorkspacePage } from "@/components/CaseWorkspace";
export default function RDQAExplainer() {
  return (
    <WorkspacePage title="RDQA" description="Occu-Med’s RDQ follow-up service.">
      <section className="mac-panel panel-body space-y-4">
        <h2 className="font-semibold">What the process involves</h2>
        <p className="text-sm leading-relaxed">
          Occu-Med guides candidates and employees classified as RDQ through the
          additional-information process on behalf of the employer. Examination
          findings may need clarification or rebuttal before Occu-Med can make a
          final placement recommendation.
        </p>
        <p className="text-sm leading-relaxed">
          The case-specific RDQA letter identifies the findings requiring
          follow-up, the medical information needed, and the type of provider
          best suited to supply it. Follow the requirements in that letter.
        </p>
      </section>
      <CaseRequirements />
      <section className="mac-panel panel-body space-y-4">
        <h2 className="font-semibold">Your next steps</h2>
        <ol className="list-decimal pl-5 space-y-3 text-sm">
          <li>
            Share the RDQA letter with the appropriate provider of your choice
            and arrange the required follow-up.
          </li>
          <li>
            Provide the specific information requested. A general statement that
            you are “cleared” may not address the case requirements.
          </li>
          <li>
            Review the deadline and financial responsibility stated for your
            case. If more time is needed, request an extension through your case
            manager.
          </li>
          <li>
            Occu-Med reviews the additional information. An examining provider’s
            opinion does not replace Occu-Med’s placement recommendation.
          </li>
        </ol>
        <p className="text-xs text-muted-foreground">
          Based on Occu-Med’s RDQA training guidance. Case and client protocols
          control the requirements.
        </p>
        <Link href="/examinee/extension-request" className="mac-text-link">
          Extension request
        </Link>
      </section>
    </WorkspacePage>
  );
}
