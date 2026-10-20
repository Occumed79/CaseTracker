import { createContext, ReactNode, useContext, useState } from "react";

export const CASE_STATUSES = [
  "Not assigned",
  "Scheduling",
  "Results pending",
  "Medical review",
  "RDQ follow-up",
  "Placement recommendation issued",
] as const;
export type CaseStatus = (typeof CASE_STATUSES)[number];
export type CaseRecord = {
  id: string;
  name: string;
  employer: string;
  position: string;
  examType: string;
  status: CaseStatus;
  deadline: string;
  requirements: string[];
  clinic: string;
  events: { id: string; text: string; at: string }[];
};
type Store = { cases: CaseRecord[]; selectedId: string };
const KEY = "occumed-case-workspace-v1";
const EMPTY: Store = { cases: [], selectedId: "" };
function readStore(): Store {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || "null");
    if (!value || !Array.isArray(value.cases)) return EMPTY;
    const cases = value.cases.filter(
      (c: CaseRecord) =>
        typeof c.id === "string" &&
        typeof c.name === "string" &&
        typeof c.employer === "string" &&
        CASE_STATUSES.includes(c.status) &&
        Array.isArray(c.requirements) &&
        c.requirements.every((r) => typeof r === "string") &&
        Array.isArray(c.events),
    );
    return {
      cases,
      selectedId: typeof value.selectedId === "string" ? value.selectedId : "",
    };
  } catch {
    return EMPTY;
  }
}
type CaseContextValue = {
  cases: CaseRecord[];
  selectedCase: CaseRecord | undefined;
  selectCase: (id: string) => void;
  saveCase: (record: Omit<CaseRecord, "events">) => void;
  storageError: string;
};
const CaseContext = createContext<CaseContextValue | null>(null);
export function CaseProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState(readStore);
  const [storageError, setStorageError] = useState("");
  const commit = (next: Store) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setStorageError("");
    } catch {
      setStorageError(
        "The change is available in this session, but could not be saved in this browser.",
      );
    }
    setStore(next);
  };
  const selectedCase =
    store.cases.find((c) => c.id === store.selectedId) ?? store.cases[0];
  const selectCase = (id: string) => commit({ ...store, selectedId: id });
  const saveCase = (record: Omit<CaseRecord, "events">) => {
    const previous = store.cases.find((c) => c.id === record.id);
    const event = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      text: previous
        ? "Case details updated in this browser"
        : "Case added to this browser workspace",
    };
    const saved = { ...record, events: [...(previous?.events ?? []), event] };
    commit({
      cases: previous
        ? store.cases.map((c) => (c.id === record.id ? saved : c))
        : [...store.cases, saved],
      selectedId: saved.id,
    });
  };
  return (
    <CaseContext.Provider
      value={{
        cases: store.cases,
        selectedCase,
        selectCase,
        saveCase,
        storageError,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
}
export function useCases() {
  const value = useContext(CaseContext);
  if (!value) throw new Error("CaseProvider is required");
  return value;
}
