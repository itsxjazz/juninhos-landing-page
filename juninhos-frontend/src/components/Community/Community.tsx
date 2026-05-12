interface SocialItem {
  name: string;
  desc: string;
  href?: string;
  accent: string;
  exclusive?: boolean;
}

const SOCIALS: SocialItem[] = [
  {
    name: 'LinkedIn',
    desc: 'Atualizações da comunidade e do mercado.',
    href: 'https://linkedin.com/company/juninhos',
    accent: '#0A66C2',
  },
  {
    name: 'WhatsApp',
    desc: 'Comunidade principal para networking e avisos rápidos.',
    accent: '#25D366',
    exclusive: true,
  },
  {
    name: 'Discord',
    desc: 'O coração da comunidade. Pair programming e chats 24/7.',
    accent: '#5865F2',
    exclusive: true,
  },
  {
    name: 'Twitter (X)',
    desc: 'Acompanhe novidades diariamente.',
    href: 'https://x.com/devsjuninhos',
    accent: '#1DA1F2',
  },
  {
    name: 'Instagram',
    desc: 'Bastidores e conteúdos da nossa jornada.',
    href: 'https://www.instagram.com/devsjuninhos/',
    accent: '#E1306C',
  },
];

const MONO = "'Fira Code', Menlo, Consolas, monospace";

export function Community() {
  return (
    <section id="community" className="community-section container">
      <header className="section-header-left">
        <span className="section-eyebrow">05 · Redes</span>
        <h2 className="section-title">Nossa Presença Digital</h2>
        <p className="section-subtitle">Onde a comunidade se encontra fora do código.</p>
      </header>

      <div className="flex flex-col gap-3 max-w-[920px]">
        {SOCIALS.map((s) => {
          const inner = (
            <>
              <span
                className="block w-[3px] h-12 rounded-full shrink-0 transition-all duration-300 group-hover:h-16"
                style={{ backgroundColor: s.accent, boxShadow: `0 0 12px ${s.accent}66` }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="!mb-0">{s.name}</h3>
                  {s.exclusive && (
                    <span
                      className="text-[0.65rem] uppercase tracking-[0.15em] text-primary/85 px-2 py-0.5 rounded border border-primary/35"
                      style={{ fontFamily: MONO }}
                    >
                      Exclusivo
                    </span>
                  )}
                </div>
                <p className="text-text-muted text-sm mt-1.5">{s.desc}</p>
              </div>
              {s.href ? (
                <span
                  aria-hidden="true"
                  className="text-primary group-hover:text-cyan group-hover:translate-x-1 text-xl transition-all duration-300 shrink-0"
                >
                  →
                </span>
              ) : (
                <span
                  className="text-text-muted/70 text-[0.7rem] shrink-0 hidden sm:inline"
                  style={{ fontFamily: MONO }}
                >
                  após inscrição
                </span>
              )}
            </>
          );

          const className = 'social-card group !p-4 sm:!p-5 !rounded-xl flex items-center gap-5';

          return s.href ? (
            <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className={className}>
              {inner}
            </a>
          ) : (
            <div key={s.name} className={className}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
