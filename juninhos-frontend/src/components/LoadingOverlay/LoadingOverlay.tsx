interface LoadingOverlayProps {
  visible: boolean;
}

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[rgba(13,11,20,0.9)] flex flex-col justify-center items-center z-[2000] backdrop-blur-sm">
      <div className="w-[60px] h-[60px] border-[5px] border-surface-alt border-t-primary rounded-full shadow-[0_0_15px_rgba(168,85,247,0.2)] [animation:var(--animate-spinner)]" />
      <p className="text-primary font-semibold mt-4 tracking-[1px]">Carregando...</p>
    </div>
  );
}
