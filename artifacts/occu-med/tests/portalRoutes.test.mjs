import test from "node:test";
import assert from "node:assert/strict";
import { ADMIN_PATHS, EXAMINEE_PATHS, PORTAL_HOME, LEGACY_EXAMINEE_PATHS, belongsToPortal } from "../src/lib/portalRoutes.ts";

test("admin and examinee use distinct route namespaces", () => {
  const admin = Object.values(ADMIN_PATHS);
  const examinee = Object.values(EXAMINEE_PATHS);
  assert.equal(new Set(admin).size, admin.length);
  assert.equal(new Set(examinee).size, examinee.length);
  assert.ok(admin.every((path) => belongsToPortal(path, "admin")));
  assert.ok(examinee.every((path) => belongsToPortal(path, "applicant")));
  assert.ok(admin.every((path) => !belongsToPortal(path, "applicant")));
  assert.ok(examinee.every((path) => !belongsToPortal(path, "admin")));
});

test("both portals retain a clinic map destination", () => {
  assert.equal(ADMIN_PATHS.map, "/admin/clinic-map");
  assert.equal(EXAMINEE_PATHS.map, "/examinee/clinic-map");
  assert.equal(LEGACY_EXAMINEE_PATHS["/map"], EXAMINEE_PATHS.map);
});

test("route prefixes cannot be confused by similarly named paths", () => {
  assert.equal(PORTAL_HOME.admin, "/admin");
  assert.equal(PORTAL_HOME.applicant, "/examinee");
  assert.equal(belongsToPortal("/administration", "admin"), false);
  assert.equal(belongsToPortal("/examinee-extra", "applicant"), false);
});
