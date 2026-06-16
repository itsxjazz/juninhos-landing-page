import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ProjectDetailPayload {
  title: string;
  body: string;
}

interface ModalContextValue {
  waitlistOpen: boolean;
  instructorOpen: boolean;
  projectDetail: ProjectDetailPayload | null;
  projectFormOpen: boolean;
  openWaitlist: () => void;
  closeWaitlist: () => void;
  openInstructor: () => void;
  closeInstructor: () => void;
  openProjectDetail: (payload: ProjectDetailPayload) => void;
  closeProjectDetail: () => void;
  openProjectForm: () => void;
  closeProjectForm: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [instructorOpen, setInstructorOpen] = useState(false);
  const [projectDetail, setProjectDetail] =
    useState<ProjectDetailPayload | null>(null);
  const [projectFormOpen, setProjectFormOpen] = useState(false);

  const openWaitlist = useCallback(() => setWaitlistOpen(true), []);
  const closeWaitlist = useCallback(() => setWaitlistOpen(false), []);
  const openInstructor = useCallback(() => setInstructorOpen(true), []);
  const closeInstructor = useCallback(() => setInstructorOpen(false), []);
  const openProjectDetail = useCallback(
    (payload: ProjectDetailPayload) => setProjectDetail(payload),
    [],
  );
  const closeProjectDetail = useCallback(() => setProjectDetail(null), []);
  const openProjectForm = useCallback(() => setProjectFormOpen(true), []);
  const closeProjectForm = useCallback(() => setProjectFormOpen(false), []);

  const value = useMemo<ModalContextValue>(
    () => ({
      waitlistOpen,
      instructorOpen,
      projectDetail,
      projectFormOpen,
      openWaitlist,
      closeWaitlist,
      openInstructor,
      closeInstructor,
      openProjectDetail,
      closeProjectDetail,
      openProjectForm,
      closeProjectForm,
    }),
    [
      waitlistOpen,
      instructorOpen,
      projectDetail,
      projectFormOpen,
      openWaitlist,
      closeWaitlist,
      openInstructor,
      closeInstructor,
      openProjectDetail,
      closeProjectDetail,
      openProjectForm,
      closeProjectForm,
    ],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside <ModalProvider>");
  return ctx;
}
