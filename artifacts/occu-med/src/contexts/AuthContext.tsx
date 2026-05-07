import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";

type UserRole = "applicant" | "admin" | null;

interface AuthContextType {
  role: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem("occu_med_auth_role");
    return (saved as UserRole) || null;
  });
  const [, setLocation] = useLocation();

  const login = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem("occu_med_auth_role", newRole);
      if (newRole === "admin") {
        setLocation("/admin");
      } else {
        setLocation("/");
      }
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
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
