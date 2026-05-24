import { useEffect } from 'react';
import { CONFIG } from '../../config';
import { useApiList } from '../../hooks/useApiList';
import type { ClassItem } from '../../types';
import { formatStatusClass } from '../../utils/formatStatus';

interface ClassesProps {
  onCardsRendered?: () => void;
}

export function Classes({ onCardsRendered }: ClassesProps) {
  const { data: classes, loaded } = useApiList<ClassItem>(CONFIG.ENDPOINTS.CLASSES);

  useEffect(() => {
    if (loaded && onCardsRendered) {
      requestAnimationFrame(() => onCardsRendered());
    }
  }, [loaded, onCardsRendered]);

  const reversedClasses = classes?.slice().reverse()

  return (
    <section id="classes" className="classes-section container">
      <header className="section-header-left">
        <span className="section-eyebrow">04 · Aulas</span>
        <h2 className="section-title">Próximas Aulas</h2>
        <p className="section-subtitle">
          Conhecimento compartilhado por quem está no mercado ou também está aprendendo.
        </p>
      </header>

      <ul className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {!loaded || !classes
          ? Array.from({ length: 3 }).map((_, i) => (
              <li
                key={i}
                className="grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-4 md:gap-8 py-6 animate-pulse"
              >
                <div className="h-4 bg-surface-alt rounded w-32" />
                <div className="space-y-2">
                  <div className="h-5 bg-surface-alt rounded w-2/3" />
                  <div className="h-4 bg-surface-alt rounded w-full max-w-[400px]" />
                </div>
                <div className="h-6 bg-surface-alt rounded-full w-20" />
              </li>
            ))
          : reversedClasses?.map((c, idx) => (
              <li
                key={`${c.titulo}-${idx}`}
                className="class-card grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-3 md:gap-8 py-6 group transition-colors hover:bg-white/[0.015] px-2"
              >
                <div className="font-mono text-sm text-text-muted md:pt-1 flex flex-col gap-1">
                  <span className="text-primary group-hover:text-cyan transition-colors">{c.data}</span>
                  <span className="text-xs opacity-60">{c.canal}</span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-text-main text-lg font-semibold mb-1 group-hover:text-cyan transition-colors">
                    {c.titulo}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-2">{c.desc}</p>
                  <p className="text-xs text-text-muted">
                    Mentor: <span className="text-primary">{c.mentor}</span>
                  </p>
                </div>

                <div className="md:self-start">
                  <span className={`status-badge ${formatStatusClass(c.status)}`}>{c.status}</span>
                </div>
              </li>
            ))}
      </ul>
    </section>
  );
}
