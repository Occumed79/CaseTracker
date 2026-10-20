// Titles and instructions verified against the supplied Occu-Med authorization packet.
export const OCCU_MED_FORMS = [
  {
    id: "examination",
    name: "Authorization for Examination",
    printedTitle: "Authorization for Examination",
    file: "/forms/authorization-for-examination-sample.pdf",
    description:
      "Identifies the specific examination components authorized by Occu-Med. The clinic performs only the listed services and marks the components completed.",
    completion:
      "The examinee signs and dates the authorization. The clinic records the services performed.",
    referenceNote:
      "The source copy contains a historical appointment date and example services. Obtain the case-specific authorization before an examination.",
  },
  {
    id: "records-release",
    name: "Authorization for Release of Medical Records",
    printedTitle:
      "Authorization for Release of Information from Medical Record",
    file: "/forms/authorization-for-release-of-medical-records-sample.pdf",
    description:
      "Authorizes the named provider to send the specified medical information to Occu-Med for evaluation in relation to essential job requirements, subject to the scope and recipients stated in the signed form.",
    completion:
      "Use the original form to identify the record subject, provider, information and time period requested, authorized recipients, expiration, signature, and date.",
    referenceNote:
      "This is the original reference form. A reference copy is not a signed release or evidence that records have been received.",
  },
] as const;
