export const applicantData = {
  name: "Alex Applicant",
  employer: "V2X",
  position: "Logistics Specialist",
  examType: "Pre-employment",
  caseNumber: "OM-2026-0148",
  status: "RDQA Required",
  deadline: "May 17 2026",
  responsibility: "Waiting on Applicant",
  nextAction: "Upload cardiology clearance letter and blood pressure log"
};

export const caseManagerData = {
  name: "Morgan Case Manager"
};

export const mockTasks = [
  { id: 1, title: "Physical Completed", status: "Complete", priority: "Normal", dueDate: "Apr 15 2026", responsible: "Clinic", action: "View" },
  { id: 2, title: "Labs Pending", status: "Pending", priority: "Normal", dueDate: "Apr 16 2026", responsible: "Clinic", action: "Track" },
  { id: 3, title: "Dental Form Signature", status: "Missing", priority: "High", dueDate: "Apr 20 2026", responsible: "Applicant", action: "Upload" },
  { id: 4, title: "Cardiology Letter Needed", status: "Urgent", priority: "Critical", dueDate: "May 17 2026", responsible: "Applicant", action: "Upload" },
  { id: 5, title: "Upload CPAP Compliance", status: "Needs Correction", priority: "High", dueDate: "May 17 2026", responsible: "Applicant", action: "Fix" },
  { id: 6, title: "Blood Pressure Log", status: "Urgent", priority: "Critical", dueDate: "May 17 2026", responsible: "Applicant", action: "Upload" }
];
