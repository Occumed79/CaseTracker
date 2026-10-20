import { Link } from "wouter";
import {
  CasePicker,
  CaseRequirements,
  WorkspacePage,
} from "@/components/CaseWorkspace";
export default function ProviderInstructions() {
  return (
    <WorkspacePage title="Provider instructions">
      <CasePicker />
      <section className="mac-panel panel-body space-y-4">
        <h2 className="font-semibold">
          Use the case-specific authorization and request
        </h2>
        <p className="text-sm leading-relaxed">
          Perform only the services listed on the Authorization for Examination
          and mark the components completed. Document findings and provide the
          information requested by Occu-Med.
        </p>
        <p className="text-sm leading-relaxed">
          For RDQ follow-up, use the actual RDQA letter. It identifies the
          information needed and the appropriate type of provider. Do not
          substitute a generic “no restrictions” letter for the specific
          request.
        </p>
        <p className="text-sm leading-relaxed">
          Occu-Med makes the placement recommendation. The examining provider
          documents findings; the employer communicates the final qualification
          decision.
        </p>
        <Link href="/eforms" className="mac-primary-button">
          View authorization references
        </Link>
      </section>
      <CaseRequirements />
    </WorkspacePage>
  );
}
