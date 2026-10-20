# Occu-Med branding and content correction

## Sources verified for this change

- Supplied `occu-med-logo.png`: used intact in the app's shared brand component, login, splash, and favicon. The public PNG is byte-identical to the supplied asset. A navy backing makes the supplied white artwork readable.
- `Occu-Med - Samples Authorization Forms[70][97].pdf`: examination reference is page 4; medical-records release reference is page 5. Exported copies retain their source text and update only the logo. The original Library source is unchanged. Applicant identity fields in these reference pages are unpopulated. The examination sample's historical appointment date and service list are explicitly identified as reference content, not assigned services.
- `RDQA Trainin 2.pdf`, pages 1–5: RDQA is Occu-Med's service guiding candidates/employees classified as RDQ through follow-up on behalf of client employers. The case-specific letter identifies findings and information required. No acronym expansion is inferred. Provider selection, case deadlines, extension requests, and placement recommendations are described using the training guidance; no general clearance promise is made.

## Corrections

- Removed the invented “Request for Documentation, Qualification, or Action” expansion, the canned “AI” medical interpretation, and its hard-coded cardiology/BP requirements.
- Removed invented form types: RDQA acknowledgment, generic electronic-signature consent, and duplicate provider release. The form catalog contains the two verified authorizations and their real PDF reference copies. The records-release page shows its exact printed title: “Authorization for Release of Information from Medical Record.”
- Removed sample applicants, employer affiliations, fabricated counts, old deadlines, medical findings, uploaded files, conversations, vaccine/passport/waiver statuses, and sample clinics. Removed simulated FileMaker success, fake invitation codes, fake submission confirmations, and unimplemented encryption/HIPAA/AI-review claims.
- Case management now starts empty. A case manager can add/edit case records, filter/search them, and select the case shown in related views. Counts, requirements, deadlines, clinic details, and activity derive from those entries. No data from the earlier seeded demo is automatically imported.
- Browser entries are local, not a connected case system. No real patient data is included in source control. Files chosen for preview stay on the device for the session; messages and requests can be copied as drafts, not falsely marked sent. The reference forms are not assigned, signed, or completed records.
- Added one transient luminous ring for pointer presses/clicks and keyboard activation across buttons and links; disabled controls are excluded. Keyboard focus remains visible. Reduced-motion users get the same static ring without animation.

## Operational scope

This change cleans the content and replaces fabricated state with actual user-entered workspace state. It does not connect OMIS/FileMaker, implement shared authentication, send communications, submit medical documents, or execute electronic signatures. Those unconnected functions are identified in the interface rather than simulated.

## Validation

- Frontend TypeScript check and Vite production build pass.
- Chromium: 126 route renders across 1440px, 768px, 390px, and 320px, covering populated and empty workspaces, with no uncaught page errors or horizontal document overflow.
- Checked empty defaults, manual case creation, edit/search/filter behavior, persistence after reload, case-specific RDQA requirements, form PDF responses, local file selection, disabled controls, pointer/keyboard press rings, ring timeout, and reduced-motion feedback.
- Supplied PNG bytes match both public source and built distribution (SHA-256 `dbf4aab9afb932f1135dbb333a91af76fc542702a8857f1dd6e09d233a130941`).
- Both exported PDFs have the exact text of their source pages; only branding changes. The built PDF copies match the source exports byte for byte.
- Desktop, phone, login, forms, case list, and both PDF reference pages were visually inspected. Test case entries existed only in the isolated test browser and are not seeded or committed.
