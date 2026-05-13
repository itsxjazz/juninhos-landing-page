import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CONFIG } from '../config';
import { useAuth, type AuthUser } from '../context/AuthContext';
import { ApiService } from '../services/api';

interface PortalLink {
  titulo: string;
  url: string;
}

interface PortalAuthResponse {
  success: boolean;
  user: AuthUser;
  mensagem: string;
  links: PortalLink[];
}

export function PortalPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<PortalAuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await ApiService.fetchAuth<PortalAuthResponse>(CONFIG.ENDPOINTS.PORTAL_AUTH);
        if (!cancelled) setData(res);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'Erro';
        setError(msg);
        // Token inválido/expirado → desloga e manda pro login
        if (msg.toLowerCase().includes('token') || msg.toLowerCase().includes('acesso')) {
          logout();
          navigate('/login', { replace: true });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(20,17,30,0.92)] backdrop-blur-md border-b border-white/[0.08]">
        <div className="container flex items-center h-[64px] justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/images/logo-grande.png" alt="Juninhos" className="h-[30px]" />
            <span className="text-text-muted text-xs uppercase tracking-[0.2em] hidden sm:inline" style={{ fontFamily: "'Fira Code', Menlo, monospace" }}>
              // Portal
            </span>
          </Link>
          <button onClick={handleLogout} className="link-btn secondary !px-5 !py-2 !text-sm">
            Sair
          </button>
        </div>
      </header>

      <main className="container pt-32 pb-24 min-h-screen">
        <section className="section-header-left">
          <span className="section-eyebrow">// ÁREA RESTRITA</span>
          <h1 className="section-title">
            {data ? data.mensagem : `Bem-vindo${user ? `, ${user.name}` : ''}!`}
          </h1>
          <p className="section-subtitle">Materiais e links exclusivos para membros.</p>
        </section>

        {loading && (
          <div className="card-item !p-8 max-w-[600px]">
            <p className="text-text-muted">Carregando dados protegidos…</p>
          </div>
        )}

        {!loading && error && (
          <div className="form-feedback error max-w-[600px]">{error}</div>
        )}

        {!loading && data && (
          <div className="grid md:grid-cols-2 gap-4 max-w-[900px]">
            {data.links.map((link) => (
              <a
                key={link.titulo}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="card-item group flex items-center gap-4 !p-5"
              >
                <span className="w-1 h-12 rounded-full bg-primary shrink-0 group-hover:bg-cyan transition-colors" />
                <div className="flex-1">
                  <h3 className="!mb-1">{link.titulo}</h3>
                  <p className="text-text-muted text-sm truncate">{link.url}</p>
                </div>
                <span className="text-primary group-hover:text-cyan group-hover:translate-x-1 text-xl transition-all">→</span>
              </a>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
