import { createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "wouter";
import { PORTAL_HOME } from "@/lib/portalRoutes";
import type { PortalRole } from "@/lib/portalRoutes";

type UserRole = PortalRole | null;

interface AuthContextType {
  role: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem("occu_med_auth_role");
    return saved === "admin" || saved === "applicant" ? saved : null;
  });
  const [, setLocation] = useLocation();

  const login = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole) {
      // This is a workspace selector, NOT server-backed account authentication.
      localStorage.setItem("occu_med_auth_role", newRole);
      setLocation(PORTAL_HOME[newRole]);
    }
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("occu_med_auth_role");
    setLocation("/login");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
