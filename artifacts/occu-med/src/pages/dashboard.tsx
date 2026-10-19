import { applicantData } from "@/data/mockData";
import {
  FileText,
  MapPin,
  MessageSquare,
  PhoneCall,
  UploadCloud,
  CalendarClock,
  Clock,
  AlertTriangle,
  ChevronRight,
  BriefcaseBusiness,
} from "lucide-react";
import { Link } from "wouter";

const RECENT_HISTORY = [
  { label: "RDQA Required", date: "Apr 28", state: "active" },
  { label: "Under SME Medical Review", date: "Apr 23", state: "done" },
  { label: "Results Received", date: "Apr 20", state: "done" },
  { label: "Appointment Attended", date: "Apr 15", state: "done" },
];
const ACTIONS = [
  { href: "/messages", icon: MessageSquare, label: "Message case manager" },
  { href: "/eforms", icon: FileText, label: "Complete forms" },
  { href: "/map", icon: MapPin, label: "Find your clinic" },
  { href: "/appointment-request", icon: PhoneCall, label: "Request a call" },
  {
    href: "/extension-request",
    icon: CalendarClock,
    label: "Request an extension",
  },
];

export default function Dashboard() {
  const pct = 58;
  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">Case {applicantData.caseNumber}</p>
          <h1>{applicantData.name}</h1>
          <p className="dashboard-subtitle">
            {applicantData.employer} · {applicantData.position}
          </p>
        </div>
        <div className="deadline-chip">
          Submission deadline<strong>{applicantData.deadline}</strong>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-column">
          <section className="mac-panel" aria-labelledby="case-status">
            <div className="panel-body">
              <p className="status-label">
                <span className="dot dot-amber" />
                Current status
              </p>
              <h2 id="case-status" className="status-heading">
                {applicantData.status}
              </h2>
              <p className="status-description">
                Additional medical information has been requested. Upload your
                documents to continue the review of your case.
              </p>
              <div className="action-callout">
                <AlertTriangle size={18} />
                <div>
                  <strong>{applicantData.responsibility}</strong>
                  <p>{applicantData.nextAction}.</p>
                </div>
              </div>
              <div className="progress-label">
                <span>Case progress</span>
                <strong>{pct}%</strong>
              </div>
              <div
                className="progress-track h-1.5"
                role="progressbar"
                aria-label="Case progress"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="progress-fill h-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <div className="status-footer">
              <Link href="/uploads" className="mac-primary-button">
                <UploadCloud size={16} />
                Upload documents
              </Link>
              <Link href="/rdqa" className="mac-text-link">
                About RDQA
              </Link>
            </div>
          </section>
          <section className="mac-panel" aria-label="Case insights">
            <div className="insight-grid">
              <div>
                <p>Progress</p>
                <strong>{pct}%</strong>
              </div>
              <div>
                <p>Priority</p>
                <strong>High</strong>
              </div>
              <div>
                <p>Next action</p>
                <strong>Upload</strong>
              </div>
            </div>
          </section>
          <section className="mac-panel" aria-labelledby="exam-title">
            <div className="panel-heading">
              <h2 id="exam-title">Exam details</h2>
            </div>
            <div className="exam-detail">
              <BriefcaseBusiness size={22} />
              <div>
                <strong>{applicantData.examType}</strong>
                <p>
                  {applicantData.employer} · {applicantData.position}
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="dashboard-column">
          <section className="mac-panel" aria-labelledby="history-title">
            <div className="panel-heading">
              <h2 id="history-title">Case history</h2>
              <Link href="/timeline" className="mac-text-link">
                View all
              </Link>
            </div>
            <div className="history-list">
              {RECENT_HISTORY.map((event) => (
                <div className="history-row" key={event.label}>
                  <span
                    className={`dot ${event.state === "active" ? "dot-blue" : "dot-green"}`}
                  />
                  <p>{event.label}</p>
                  <time>{event.date}</time>
                </div>
              ))}
            </div>
          </section>
          <section className="mac-panel" aria-labelledby="actions-title">
            <div className="panel-heading">
              <h2 id="actions-title">Quick actions</h2>
            </div>
            {ACTIONS.map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href} className="quick-action">
                <Icon size={17} strokeWidth={1.75} />
                <span className="flex-1">{label}</span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </Link>
            ))}
            <Link href="/timeline" className="quick-action">
              <Clock size={17} strokeWidth={1.75} />
              <span className="flex-1">Full timeline</span>
              <ChevronRight size={14} className="text-muted-foreground" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
