export type PortalRole = "admin" | "applicant";

export const PORTAL_HOME: Record<PortalRole, string> = {
  admin: "/admin",
  applicant: "/examinee",
};

export const ADMIN_PATHS = {
  home: "/admin",
  cases: "/admin/cases",
  invites: "/admin/invites",
  map: "/admin/clinic-map",
  settings: "/admin/settings",
  filemaker: "/admin/settings/filemaker",
} as const;

export const EXAMINEE_PATHS = {
  home: "/examinee",
  tasks: "/examinee/tasks",
  uploads: "/examinee/uploads",
  messages: "/examinee/messages",
  more: "/examinee/more",
  timeline: "/examinee/timeline",
  rdqa: "/examinee/rdqa",
  waiver: "/examinee/waiver",
  map: "/examinee/clinic-map",
  reminders: "/examinee/reminders",
  forms: "/examinee/eforms",
  vault: "/examinee/vault",
  appointment: "/examinee/appointment-request",
  extension: "/examinee/extension-request",
  profile: "/examinee/profile",
  provider: "/examinee/provider-instructions",
  travel: "/examinee/travel",
  settings: "/examinee/settings",
  filemaker: "/examinee/settings/filemaker",
} as const;

export const LEGACY_EXAMINEE_PATHS: Record<string, string> = {
  "/tasks": EXAMINEE_PATHS.tasks,
  "/uploads": EXAMINEE_PATHS.uploads,
  "/messages": EXAMINEE_PATHS.messages,
  "/more": EXAMINEE_PATHS.more,
  "/timeline": EXAMINEE_PATHS.timeline,
  "/rdqa": EXAMINEE_PATHS.rdqa,
  "/waiver": EXAMINEE_PATHS.waiver,
  "/map": EXAMINEE_PATHS.map,
  "/reminders": EXAMINEE_PATHS.reminders,
  "/eforms": EXAMINEE_PATHS.forms,
  "/vault": EXAMINEE_PATHS.vault,
  "/appointment-request": EXAMINEE_PATHS.appointment,
  "/extension-request": EXAMINEE_PATHS.extension,
  "/profile": EXAMINEE_PATHS.profile,
  "/provider-instructions": EXAMINEE_PATHS.provider,
  "/travel": EXAMINEE_PATHS.travel,
  "/settings": EXAMINEE_PATHS.settings,
  "/settings/filemaker": EXAMINEE_PATHS.filemaker,
};

export function belongsToPortal(path: string, portal: PortalRole): boolean {
  const home = PORTAL_HOME[portal];
  return path === home || path.startsWith(home + "/");
}
