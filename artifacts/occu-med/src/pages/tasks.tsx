import {
  CasePicker,
  CaseRequirements,
  WorkspacePage,
} from "@/components/CaseWorkspace";
export default function Tasks() {
  return (
    <WorkspacePage
      title="Case requirements"
      description="Follow-up entered from the selected case notice."
    >
      <CasePicker />
      <CaseRequirements />
    </WorkspacePage>
  );
}
