import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, children, maxWidth }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevScrollBehavior = document.documentElement.style.scrollBehavior;

    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
    };
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      className={`fixed top-0 left-0 w-full h-screen flex justify-center items-center z-[2000] p-4 [overscroll-behavior:contain] transition-[opacity,visibility,background-color,backdrop-filter] duration-[350ms] ease-out ${
        open
          ? 'opacity-100 visible bg-black/60 backdrop-blur-md'
          : 'opacity-0 invisible bg-transparent backdrop-blur-0'
      }`}
    >
      <div
        className={`modal-content bg-surface w-full rounded-xl p-8 relative max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.45)] [overscroll-behavior:contain] transition-[opacity,transform] duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1.2,0.36,1)] max-md:px-4 max-md:pt-6 max-md:pb-12 max-md:max-h-[95vh] max-md:w-[95%] ${
          open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-[30px]'
        }`}
        style={maxWidth ? { maxWidth } : { maxWidth: '600px' }}
      >
        <button
          aria-label="Fechar modal"
          onClick={onClose}
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center text-[2rem] leading-none bg-transparent border-none text-text-muted cursor-pointer z-[2] transition-[color,background-color] duration-200 hover:text-text-main hover:bg-white/5 hover:rounded-full max-md:top-2 max-md:right-4"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
