import { Link } from 'react-router-dom';

// Layout: dashboard com sidebar fixa (esquerda) + main content (direita).
// Rota: /portal/preview — dados fictícios, sem auth.

const MONO = "'Fira Code', Menlo, Consolas, monospace";

interface Badge {
  id: string;
  label: string;
  color: string;
}

const MOCK_USER = {
  name: 'Kayki Macedo',
  email: 'kayki@juninhos.com',
  joinedAt: 'jan/2026',
  primaryRole: 'MEMBRO',
  careerLevel: 'PLENO',
  bio: 'Desenvolvedor pleno · líder de squad · entusiasta de IA e mentoria.',
  badges: [
    { id: 'apoiador', label: 'Apoiador', color: '#F59E0B' },
    { id: 'equipe', label: 'Equipe', color: '#00E5FF' },
    { id: 'instrutor', label: 'Instrutor', color: '#A855F7' },
    { id: 'destaque', label: 'Destaque', color: '#FF4D9D' },
    { id: 'squad-phoenix', label: 'Squad Phoenix', color: '#10B981' },
    { id: 'recrutador', label: 'Recrutador', color: '#FB923C' },
  ] as Badge[],
  squad: { name: 'Phoenix', project: 'Plataforma de Mentorias', phase: 'Em Desenvolvimento', leader: 'Maria Silva', members: 5 },
  company: { name: 'TechCorp', vagasAtivas: 3, candidatos: 12 },
  instructor: { agendadas: 2, ministradas: 8, pendentes: 1 },
  teamShortcuts: ['Gerenciar Aulas', 'Aprovar Conteúdo', 'Designar Squads', 'Gerenciar Empresas'],
  stats: { aulasAssistidas: 24, projetosContribuidos: 3, anosComunidade: 2, contribuicoes: 47 },
};

// ===== SVG Icons (inline, sem libs) =====
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const IconBook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
);
const IconRocket = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
);
const IconBriefcase = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
);
const IconSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
);
const IconLogOut = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
);
const IconUsers = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const IconCrown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" /></svg>
);

const NAV_ITEMS = [
  { id: 'perfil', label: 'Perfil', icon: <IconUser />, active: true },
  { id: 'aulas', label: 'Aulas', icon: <IconBook /> },
  { id: 'projetos', label: 'Projetos', icon: <IconRocket /> },
  { id: 'vagas', label: 'Vagas', icon: <IconBriefcase /> },
  { id: 'config', label: 'Configurações', icon: <IconSettings /> },
];

function BadgePill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full font-semibold"
      style={{
        fontFamily: MONO,
        color,
        backgroundColor: `${color}1a`,
        border: `1px solid ${color}55`,
      }}
    >
      <span aria-hidden="true" className="w-1 h-1 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
      {label}
    </span>
  );
}

export function PortalPreviewPage() {
  const initial = MOCK_USER.name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-bg -mt-20">
      {/* Banner âmbar de preview */}
      <div className="fixed top-0 left-0 right-0 z-[200] bg-amber-500/90 text-black text-center text-xs font-semibold py-1 tracking-wider uppercase">
        PREVIEW MODE — dados fictícios, sem autenticação ·{' '}
        <Link to="/portal" className="underline">ver versão real</Link>
      </div>

      <div className="flex pt-[26px] min-h-screen">
        {/* ====== SIDEBAR ====== */}
        <aside className="fixed left-0 top-[26px] bottom-0 w-[240px] bg-[rgba(15,13,22,0.95)] border-r border-white/[0.06] backdrop-blur-md flex flex-col z-50 max-md:hidden">
          {/* Logo */}
          <div className="px-5 py-5 border-b border-white/[0.06]">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/assets/images/logo-grande.png" alt="Juninhos" className="h-[26px]" />
              <span className="text-text-muted text-[0.65rem] uppercase tracking-[0.22em]" style={{ fontFamily: MONO }}>
                // Portal
              </span>
            </Link>
          </div>

          {/* Nav */}
          <nav aria-label="Navegação do portal" className="flex-1 px-3 py-4">
            <ul className="flex flex-col gap-0.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href="#"
                    aria-current={item.active ? 'page' : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? 'bg-primary/15 text-cyan border-l-2 border-cyan -ml-[2px] pl-[10px]'
                        : 'text-text-muted hover:text-text-main hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className={item.active ? 'text-cyan' : 'text-text-muted'}>{item.icon}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* User mini card */}
          <div className="border-t border-white/[0.06] p-3">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
              <div
                className="w-9 h-9 rounded-full bg-[linear-gradient(135deg,#A855F7_0%,#00E5FF_100%)] flex items-center justify-center text-white font-bold text-sm shrink-0"
                aria-hidden="true"
              >
                {initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-text-main font-semibold truncate">{MOCK_USER.name}</div>
                <div className="text-[0.65rem] text-text-muted truncate uppercase tracking-wider" style={{ fontFamily: MONO }}>
                  {MOCK_USER.primaryRole} · {MOCK_USER.careerLevel}
                </div>
              </div>
              <Link to="/" aria-label="Sair" className="text-text-muted hover:text-error transition-colors p-1">
                <IconLogOut />
              </Link>
            </div>
          </div>
        </aside>

        {/* ====== TOPBAR MOBILE ====== */}
        <header className="fixed top-[26px] left-0 right-0 h-[56px] bg-[rgba(15,13,22,0.95)] border-b border-white/[0.06] backdrop-blur-md md:hidden z-50 flex items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/images/logo-grande.png" alt="Juninhos" className="h-[24px]" />
          </Link>
          <nav aria-label="Navegação mobile" className="flex-1 overflow-x-auto mx-4">
            <ul className="flex items-center gap-1 min-w-max">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href="#"
                    className={`inline-block px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
                      item.active ? 'text-cyan bg-cyan/10' : 'text-text-muted'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/" aria-label="Sair" className="text-text-muted">
            <IconLogOut />
          </Link>
        </header>

        {/* ====== MAIN ====== */}
        <main className="flex-1 md:ml-[240px] max-md:pt-[56px]">
          {/* Banner de capa com avatar overlapping */}
          <section className="relative">
            <div
              className="h-[180px] md:h-[200px] relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(168,85,247,0.4) 0%, rgba(0,229,255,0.25) 60%, rgba(20,17,30,1) 100%), radial-gradient(ellipse at 20% 30%, rgba(168,85,247,0.5), transparent 60%)',
              }}
            >
              <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg/80" />
            </div>

            <div className="px-6 md:px-10">
              {/* Avatar — sobrepõe banner */}
              <div className="flex items-end justify-between gap-4 -mt-12 md:-mt-14">
                <div
                  className="w-[96px] h-[96px] z-1000 md:w-[112px] md:h-[112px] rounded-full bg-[linear-gradient(135deg,#A855F7_0%,#00E5FF_100%)] flex items-center justify-center text-white font-bold text-4xl md:text-5xl shrink-0 border-4 border-bg shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                  aria-hidden="true"
                >
                  {initial}
                </div>
                <button type="button" className="link-btn secondary !px-4 !py-2 !text-sm shrink-0 mb-1">
                  Editar perfil
                </button>
              </div>

              {/* Nome + info abaixo do avatar */}
              <div className="mt-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1 leading-tight">
                  {MOCK_USER.name}
                </h1>
                <p className="text-text-muted text-sm mb-2">{MOCK_USER.bio}</p>
                <div
                  className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted"
                  style={{ fontFamily: MONO }}
                >
                  <span>{MOCK_USER.email}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-primary font-semibold uppercase tracking-wider">{MOCK_USER.primaryRole}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-cyan font-semibold uppercase tracking-wider">{MOCK_USER.careerLevel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-text-muted/70">desde {MOCK_USER.joinedAt}</span>
                </div>
              </div>

              {/* Badges row */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {MOCK_USER.badges.map((b) => (
                  <BadgePill key={b.id} label={b.label} color={b.color} />
                ))}
              </div>
            </div>
          </section>

          {/* Content sections */}
          <div className="px-6 md:px-10 pt-3 pb-8 space-y-3">
            {/* ====== STATS ====== */}
            <section>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Aulas assistidas', value: MOCK_USER.stats.aulasAssistidas, color: 'text-primary' },
                  { label: 'Projetos', value: MOCK_USER.stats.projetosContribuidos, color: 'text-cyan' },
                  { label: 'Anos na comunidade', value: MOCK_USER.stats.anosComunidade, color: 'text-success' },
                  { label: 'Contribuições', value: MOCK_USER.stats.contribuicoes, color: 'text-amber-400' },
                ].map((s) => (
                  <div key={s.label} className="card-item !p-4">
                    <div className={`text-2xl font-bold leading-none ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-text-muted mt-1.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ====== GRID PRINCIPAL: 2 col em desktop ====== */}
            <section className="grid lg:grid-cols-3 gap-3">
              {/* SQUAD — col larga */}
              <article className="card-item !p-5 lg:col-span-2">
                <header className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-success/10 border border-success/30 flex items-center justify-center text-success">
                      <IconUsers />
                    </span>
                    <div>
                      <h3 className="!mb-0 !text-base">Squad {MOCK_USER.squad.name}</h3>
                      <p className="text-text-muted text-xs">{MOCK_USER.squad.project}</p>
                    </div>
                  </div>
                  <span className="status-badge !mb-0 shrink-0">{MOCK_USER.squad.phase}</span>
                </header>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-wider text-text-muted/70" style={{ fontFamily: MONO }}>Líder</div>
                    <div className="text-text-main mt-0.5">{MOCK_USER.squad.leader}</div>
                  </div>
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-wider text-text-muted/70" style={{ fontFamily: MONO }}>Membros</div>
                    <div className="text-text-main mt-0.5">{MOCK_USER.squad.members}</div>
                  </div>
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-wider text-text-muted/70" style={{ fontFamily: MONO }}>Meu papel</div>
                    <div className="text-cyan mt-0.5">Co-líder</div>
                  </div>
                </div>
                <a href="#" className="group inline-flex items-center gap-1.5 mt-3 text-xs text-primary hover:text-cyan transition-colors uppercase tracking-wider" style={{ fontFamily: MONO }}>
                  Ver squad <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </article>

              {/* INSTRUTOR */}
              <article className="card-item !p-5">
                <header className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                    <IconBook />
                  </span>
                  <h3 className="!mb-0 !text-base">Instrutor</h3>
                </header>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary leading-none">{MOCK_USER.instructor.agendadas}</div>
                    <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Agendadas</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-cyan leading-none">{MOCK_USER.instructor.ministradas}</div>
                    <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Ministradas</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-amber-400 leading-none">{MOCK_USER.instructor.pendentes}</div>
                    <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Pendentes</div>
                  </div>
                </div>
                <a href="#" className="group inline-flex items-center gap-1.5 mt-3 text-xs text-primary hover:text-cyan transition-colors uppercase tracking-wider" style={{ fontFamily: MONO }}>
                  Minhas aulas <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </article>

              {/* RECRUTADOR */}
              <article className="card-item !p-5">
                <header className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#FB923C]/10 border border-[#FB923C]/30 flex items-center justify-center text-[#FB923C]">
                    <IconBriefcase />
                  </span>
                  <div>
                    <h3 className="!mb-0 !text-base">{MOCK_USER.company.name}</h3>
                    <p className="text-text-muted text-xs">Recrutador</p>
                  </div>
                </header>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                    <span className="text-text-muted text-xs">Vagas ativas</span>
                    <span className="text-text-main font-semibold">{MOCK_USER.company.vagasAtivas}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-text-muted text-xs">Candidatos</span>
                    <span className="text-text-main font-semibold">{MOCK_USER.company.candidatos}</span>
                  </div>
                </div>
                <a href="#" className="group inline-flex items-center gap-1.5 mt-3 text-xs text-primary hover:text-cyan transition-colors uppercase tracking-wider" style={{ fontFamily: MONO }}>
                  Gerenciar <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </article>

              {/* EQUIPE — col larga */}
              <article className="card-item !p-5 lg:col-span-2">
                <header className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan">
                    <IconCrown />
                  </span>
                  <div>
                    <h3 className="!mb-0 !text-base">Painel da Equipe</h3>
                    <p className="text-text-muted text-xs">Atalhos administrativos</p>
                  </div>
                </header>
                <ul className="grid grid-cols-2 gap-1.5">
                  {MOCK_USER.teamShortcuts.map((s) => (
                    <li key={s}>
                      <a
                        href="#"
                        className="group flex items-center justify-between gap-2 px-3 py-2 text-sm text-text-main bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] hover:border-cyan/30 rounded-lg transition-all"
                      >
                        <span>{s}</span>
                        <span className="text-primary group-hover:text-cyan group-hover:translate-x-1 transition-all text-xs">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
