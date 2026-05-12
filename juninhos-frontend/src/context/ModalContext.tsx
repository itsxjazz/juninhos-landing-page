import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface ProjectDetailPayload {
  title: string;
  body: string;
}

interface ModalContextValue {
  waitlistOpen: boolean;
  instructorOpen: boolean;
  projectDetail: ProjectDetailPayload | null;
  openWaitlist: () => void;
  closeWaitlist: () => void;
  openInstructor: () => void;
  closeInstructor: () => void;
  openProjectDetail: (payload: ProjectDetailPayload) => void;
  closeProjectDetail: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [instructorOpen, setInstructorOpen] = useState(false);
  const [projectDetail, setProjectDetail] = useState<ProjectDetailPayload | null>(null);

  const openWaitlist = useCallback(() => setWaitlistOpen(true), []);
  const closeWaitlist = useCallback(() => setWaitlistOpen(false), []);
  const openInstructor = useCallback(() => setInstructorOpen(true), []);
  const closeInstructor = useCallback(() => setInstructorOpen(false), []);
  const openProjectDetail = useCallback((payload: ProjectDetailPayload) => setProjectDetail(payload), []);
  const closeProjectDetail = useCallback(() => setProjectDetail(null), []);

  const value = useMemo<ModalContextValue>(
    () => ({
      waitlistOpen,
      instructorOpen,
      projectDetail,
      openWaitlist,
      closeWaitlist,
      openInstructor,
      closeInstructor,
      openProjectDetail,
      closeProjectDetail,
    }),
    [
      waitlistOpen,
      instructorOpen,
      projectDetail,
      openWaitlist,
      closeWaitlist,
      openInstructor,
      closeInstructor,
      openProjectDetail,
      closeProjectDetail,
    ],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside <ModalProvider>');
  return ctx;
}
