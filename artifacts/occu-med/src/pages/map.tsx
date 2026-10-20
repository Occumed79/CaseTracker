import { MapPin, ExternalLink } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCases } from "@/contexts/CaseContext";
import { CasePicker, EmptyCase, WorkspacePage } from "@/components/CaseWorkspace";

export default function ClinicMap() {
  const { role } = useAuth();
  const { selectedCase: currentCase } = useCases();
  const clinic = currentCase?.clinic?.trim();
  const googleSearch = clinic ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(clinic) : "";
  const appleSearch = clinic ? "https://maps.apple.com/?q=" + encodeURIComponent(clinic) : "";
  const embeddedMap = clinic ? "https://maps.google.com/maps?q=" + encodeURIComponent(clinic) + "&z=14&output=embed" : "";

  return (
    <WorkspacePage
      title={role === "admin" ? "Clinic map" : "Assigned clinic map"}
      description="Map view of the location recorded for the selected case. Check the case-specific Authorization for Examination for the confirmed address."
    >
      <CasePicker />
      {!currentCase ? (
        <EmptyCase description="The clinic map will appear once a case is entered and a clinic is assigned." />
      ) : !clinic ? (
        <section className="mac-panel empty-case">
          <MapPin size={27} />
          <h2 className="font-semibold">No clinic assigned</h2>
          <p className="text-sm text-muted-foreground">An assigned clinic or address has not been entered for this case.</p>
        </section>
      ) : (
        <section className="mac-panel clinic-map-panel">
          <div className="panel-body space-y-2">
            <p className="eyebrow">Case {currentCase.id}</p>
            <h2 className="text-lg font-semibold break-words">{clinic}</h2>
            <p className="text-xs text-muted-foreground">The map searches the clinic name or address recorded on this case; this is not a verified pin or clinic-directory record.</p>
          </div>
          <div className="clinic-map-frame">
            <iframe
              title={"Map of the assigned clinic for case " + currentCase.id}
              src={embeddedMap}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="clinic-map-actions">
            <a className="mac-primary-button" href={googleSearch} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} /> Google Maps
            </a>
            <a className="mac-demo-button px-4" href={appleSearch} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} /> Apple Maps
            </a>
          </div>
        </section>
      )}
    </WorkspacePage>
  );
}
