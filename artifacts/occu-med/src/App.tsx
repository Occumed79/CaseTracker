import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";

// Pages
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

function ProtectedRoute({ component: Component, adminOnly = false }: { component: any, adminOnly?: boolean }) {
  const { role } = useAuth();
  
  if (!role) return <Login />;
  if (adminOnly && role !== "admin") return <div className="p-8 text-center text-white/50 mt-20">Access Denied</div>;
  
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/splash" component={Splash} />
      <Route path="/login" component={Login} />
      
      <Route path="/" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/tasks" component={() => <ProtectedRoute component={Tasks} />} />
      <Route path="/uploads" component={() => <ProtectedRoute component={Uploads} />} />
      <Route path="/messages" component={() => <ProtectedRoute component={Messages} />} />
      <Route path="/more" component={() => <ProtectedRoute component={More} />} />
      
      {/* Admin routes */}
      <Route path="/admin" component={() => <ProtectedRoute component={AdminDashboard} adminOnly />} />
      <Route path="/admin/cases" component={() => <ProtectedRoute component={AdminCases} adminOnly />} />
      <Route path="/admin/invites" component={() => <ProtectedRoute component={AdminInvites} adminOnly />} />

      {/* Detail routes */}
      <Route path="/timeline" component={() => <ProtectedRoute component={Timeline} />} />
      <Route path="/rdqa" component={() => <ProtectedRoute component={RDQAExplainer} />} />
      <Route path="/waiver" component={() => <ProtectedRoute component={Waiver} />} />
      <Route path="/map" component={() => <ProtectedRoute component={Map} />} />
      <Route path="/reminders" component={() => <ProtectedRoute component={Reminders} />} />
      <Route path="/eforms" component={() => <ProtectedRoute component={EForms} />} />
      <Route path="/vault" component={() => <ProtectedRoute component={Vault} />} />
      <Route path="/appointment-request" component={() => <ProtectedRoute component={AppointmentRequest} />} />
      <Route path="/extension-request" component={() => <ProtectedRoute component={ExtensionRequest} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />
      <Route path="/provider-instructions" component={() => <ProtectedRoute component={ProviderInstructions} />} />
      <Route path="/travel" component={() => <ProtectedRoute component={TravelReadiness} />} />
      <Route path="/settings" component={() => <ProtectedRoute component={Settings} />} />
      <Route path="/settings/filemaker" component={() => <ProtectedRoute component={FilemakerSettings} />} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Layout>
              <Router />
            </Layout>
          </AuthProvider>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
