import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRound, Users, ArrowRight } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const [code, setCode] = useState("");
  return (
    <div className="aurora-bg min-h-[100dvh] flex items-center justify-center p-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-7">
          <div
            className="mac-brand-icon mx-auto mb-4"
            style={{ width: 64, height: 64, padding: 12, borderRadius: 16 }}
          >
            <img src="/occu-med-logo.png" alt="Occu-Med" />
          </div>
          <h1 className="text-[28px] font-bold tracking-tight">CaseTrack</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your medical readiness, in one place.
          </p>
        </div>
        <div className="mac-panel p-6">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              login("applicant");
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="invitation-code"
                className="block text-[13px] font-semibold mb-2"
              >
                Invitation code
              </label>
              <input
                id="invitation-code"
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="OM-ABCD-1234"
                className="glass-input w-full h-11 text-sm"
                aria-describedby="invitation-help"
              />
              <p
                id="invitation-help"
                className="text-xs text-muted-foreground mt-2"
              >
                Use the code provided by your recruiter or HR contact.
              </p>
            </div>
            <button type="submit" className="mac-primary-button w-full">
              Access my case
              <ArrowRight size={15} />
            </button>
          </form>
          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-border flex-1" />
            <p className="text-xs text-muted-foreground">Demo access</p>
            <div className="h-px bg-border flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => login("applicant")}
              className="mac-demo-button"
            >
              <UserRound size={16} />
              Applicant
            </button>
            <button
              type="button"
              onClick={() => login("admin")}
              className="mac-demo-button"
            >
              <Users size={16} />
              Case manager
            </button>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-5">
          Demo workspace · Sample case data
        </p>
      </div>
    </div>
  );
}
