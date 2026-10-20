import { useAuth } from "@/contexts/AuthContext";
import { UserRound, Users } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
export default function Login() {
  const { login } = useAuth();
  return (
    <div className="aurora-bg min-h-[100dvh] flex items-center justify-center p-6">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-7">
          <div className="flex justify-center mb-5">
            <BrandLogo large />
          </div>
          <h1 className="text-[28px] font-bold tracking-tight">CaseTrack</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Occu-Med case workspace
          </p>
        </div>
        <div className="mac-panel panel-body space-y-5">
          <p className="text-sm text-muted-foreground">
            Open a workspace view. Account sign-in and shared case access are
            not connected.
          </p>
          <button
            type="button"
            onClick={() => login("applicant")}
            className="mac-primary-button w-full"
          >
            <UserRound size={17} />
            Open applicant workspace
          </button>
          <button
            type="button"
            onClick={() => login("admin")}
            className="mac-demo-button w-full"
          >
            <Users size={17} />
            Open case manager workspace
          </button>
        </div>
      </div>
    </div>
  );
}
