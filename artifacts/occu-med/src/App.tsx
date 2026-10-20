import { Switch, Route, Redirect, Router as WouterRouter, useLocation } from "wouter";
import type { ComponentType } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ClickFeedback } from "@/components/ClickFeedback";
import { CaseProvider } from "@/contexts/CaseContext";
import { Layout } from "@/components/Layout";
import { PORTAL_HOME, LEGACY_EXAMINEE_PATHS } from "@/lib/portalRoutes";
import type { PortalRole } from "@/lib/portalRoutes";

import Splash from "@/pages/splash";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Tasks from "@/pages/tasks";
import Uploads from "@/pages/uploads";
import Messages from "@/pages/messages";
import More from "@/pages/more";
import Timeline from "@/pages/timeline";
import RDQAExplainer from "@/pages/rdqa";
import Waiver from "@/pages/waiver";
import Map from "@/pages/map";
import Reminders from "@/pages/reminders";
import EForms from "@/pages/eforms";
import Vault from "@/pages/vault";
import AppointmentRequest from "@/pages/appointment-request";
import ExtensionRequest from "@/pages/extension-request";
import Profile from "@/pages/profile";
import ProviderInstructions from "@/pages/provider-instructions";
import TravelReadiness from "@/pages/travel";
import Settings from "@/pages/settings";
import FilemakerSettings from "@/pages/settings-filemaker";
import AdminDashboard from "@/pages/admin";
import AdminCases from "@/pages/admin-cases";
import AdminInvites from "@/pages/admin-invites";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// A UI-only role guard. The demo has no server authentication or case-level access control.
function PortalRoute({ component: Component, portal }: { component: ComponentType; portal: PortalRole }) {
  const { role } = useAuth();
  if (!role) return <Redirect to="/login" />;
  if (role !== portal) {
    return (
      <div className="mac-panel panel-body space-y-3" role="alert">
        <h1 className="font-semibold text-xl">This is a separate portal</h1>
        <p className="text-sm text-muted-foreground">
          Sign out before opening another portal. This demonstration does not provide account sign-in.
        </p>
        <a href={PORTAL_HOME[role]} className="mac-primary-button">Return to your portal</a>
      </div>
    );
  }
  return <Component />;
}

function LandingRoute() {
  const { role } = useAuth();
  return role ? <Redirect to={PORTAL_HOME[role]} /> : <Redirect to="/login" />;
}

function LegacyRoute() {
  const { role } = useAuth();
  const [location] = useLocation();
  const destination = LEGACY_EXAMINEE_PATHS[location];
  if (destination && role === "applicant") return <Redirect to={destination} />;
  if (destination && role === "admin") return <Redirect to={PORTAL_HOME.admin} />;
  return <NotFound />;
}

function Router() {
  return (
    <Switch>
      <Route path="/splash" component={Splash} />
      <Route path="/login" component={Login} />
      <Route path="/" component={LandingRoute} />

      {/* Admin-only navigation and screens */}
      <Route path="/admin" component={() => <PortalRoute component={AdminDashboard} portal="admin" />} />
      <Route path="/admin/cases" component={() => <PortalRoute component={AdminCases} portal="admin" />} />
      <Route path="/admin/invites" component={() => <PortalRoute component={AdminInvites} portal="admin" />} />
      <Route path="/admin/clinic-map" component={() => <PortalRoute component={Map} portal="admin" />} />
      <Route path="/admin/settings" component={() => <PortalRoute component={Settings} portal="admin" />} />
      <Route path="/admin/settings/filemaker" component={() => <PortalRoute component={FilemakerSettings} portal="admin" />} />

      {/* Examinee-only navigation and screens */}
      <Route path="/examinee" component={() => <PortalRoute component={Dashboard} portal="applicant" />} />
      <Route path="/examinee/tasks" component={() => <PortalRoute component={Tasks} portal="applicant" />} />
      <Route path="/examinee/uploads" component={() => <PortalRoute component={Uploads} portal="applicant" />} />
      <Route path="/examinee/messages" component={() => <PortalRoute component={Messages} portal="applicant" />} />
      <Route path="/examinee/more" component={() => <PortalRoute component={More} portal="applicant" />} />
      <Route path="/examinee/timeline" component={() => <PortalRoute component={Timeline} portal="applicant" />} />
      <Route path="/examinee/rdqa" component={() => <PortalRoute component={RDQAExplainer} portal="applicant" />} />
      <Route path="/examinee/waiver" component={() => <PortalRoute component={Waiver} portal="applicant" />} />
      <Route path="/examinee/clinic-map" component={() => <PortalRoute component={Map} portal="applicant" />} />
      <Route path="/examinee/reminders" component={() => <PortalRoute component={Reminders} portal="applicant" />} />
      <Route path="/examinee/eforms" component={() => <PortalRoute component={EForms} portal="applicant" />} />
      <Route path="/examinee/vault" component={() => <PortalRoute component={Vault} portal="applicant" />} />
      <Route path="/examinee/appointment-request" component={() => <PortalRoute component={AppointmentRequest} portal="applicant" />} />
      <Route path="/examinee/extension-request" component={() => <PortalRoute component={ExtensionRequest} portal="applicant" />} />
      <Route path="/examinee/profile" component={() => <PortalRoute component={Profile} portal="applicant" />} />
      <Route path="/examinee/provider-instructions" component={() => <PortalRoute component={ProviderInstructions} portal="applicant" />} />
      <Route path="/examinee/travel" component={() => <PortalRoute component={TravelReadiness} portal="applicant" />} />
      <Route path="/examinee/settings" component={() => <PortalRoute component={Settings} portal="applicant" />} />
      <Route path="/examinee/settings/filemaker" component={() => <PortalRoute component={FilemakerSettings} portal="applicant" />} />

      <Route component={LegacyRoute} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ClickFeedback />
          <AuthProvider>
            <CaseProvider>
              <Layout><Router /></Layout>
            </CaseProvider>
          </AuthProvider>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
