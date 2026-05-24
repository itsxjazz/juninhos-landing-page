import { useMemo, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CONFIG } from '../config';
import { useAuth, type AuthUser } from '../context/AuthContext';
import { ApiService } from '../services/api';
import type { FeedbackType } from '../types';

type Tab = 'login' | 'register' | 'forgot';

interface AuthSuccess {
  message: string;
  token: string;
  user: AuthUser;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MONO = "'Fira Code', Menlo, Consolas, monospace";

const BENEFITS = [
  'Salas de pair programming 24/7 no Discord',
  'Squads de projetos colaborativos reais',
  'Aulas e mentorias semanais entre membros',
  'Network com devs de todos os níveis',
];

const TAGLINES: Record<Tab, { eyebrow: string; title: string; sub: string }> = {
  login: {
    eyebrow: '// PORTAL JUNINHOS',
    title: 'Bem-vindo de volta',
    sub: 'Acesse os recursos exclusivos da comunidade — squads, mentorias, canais privados.',
  },
  register: {
    eyebrow: '// NOVO MEMBRO',
    title: 'Junte-se à comunidade',
    sub: 'Crie sua conta e ganhe acesso aos materiais e canais reservados aos juninhos.',
  },
  forgot: {
    eyebrow: '// RECUPERAÇÃO',
    title: 'Esqueceu a senha?',
    sub: 'Sem stress. Te enviamos um link por e-mail pra criar uma nova.',
  },
};

function passwordStrength(pw: string): number {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[!@#$%^&*]/.test(pw)) score++;
  return score;
}

const STRENGTH_LABELS = ['—', 'Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
const STRENGTH_TEXT_CLASS = ['text-text-muted', 'text-error', 'text-error', 'text-amber-400', 'text-success', 'text-success'];
const STRENGTH_BAR_CLASS = ['bg-error', 'bg-error', 'bg-amber-400', 'bg-amber-400', 'bg-success', 'bg-success'];

export function LoginPage() {
  const [tab, setTab] = useState<Tab>('login');
  const [feedback, setFeedback] = useState<{ msg: string; type: FeedbackType } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerPassword, setRegisterPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname || '/portal';

  const strength = useMemo(() => passwordStrength(registerPassword), [registerPassword]);
  const tagline = TAGLINES[tab];

  const switchTab = (t: Tab) => {
    setTab(t);
    setFeedback(null);
    setShowPassword(false);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');

    setSubmitting(true);
    setFeedback(null);
    try {
      const res = await ApiService.postAuth<AuthSuccess>(CONFIG.ENDPOINTS.LOGIN, { email, password });
      login(res.token, res.user);
      navigate(from, { replace: true });
    } catch (err) {
      setFeedback({ msg: err instanceof Error ? err.message : 'Erro', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') ?? '');
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    const confirm = String(form.get('confirm') ?? '');

    if (!EMAIL_REGEX.test(email)) return setFeedback({ msg: 'Formato de e-mail inválido.', type: 'error' });
    if (strength < 4) return setFeedback({ msg: 'Senha fraca. Precisa de letra maiúscula, número e símbolo (min 8).', type: 'error' });
    if (password !== confirm) return setFeedback({ msg: 'As senhas não coincidem.', type: 'error' });

    setSubmitting(true);
    setFeedback(null);
    try {
      await ApiService.postAuth(CONFIG.ENDPOINTS.REGISTER, { name, email, password });
      setFeedback({ msg: 'Conta criada! Faça login pra continuar.', type: 'success' });
      setTab('login');
      setRegisterPassword('');
    } catch (err) {
      setFeedback({ msg: err instanceof Error ? err.message : 'Erro', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgot = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') ?? '');

    setSubmitting(true);
    setFeedback(null);
    try {
      const res = await ApiService.postAuth(CONFIG.ENDPOINTS.FORGOT_PASSWORD, { email });
      setFeedback({ msg: res.message, type: 'success' });
    } catch (err) {
      setFeedback({ msg: err instanceof Error ? err.message : 'Erro', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const EyeIcon = ({ visible }: { visible: boolean }) =>
    visible ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );

  return (
    <div className="min-h-screen relative overflow-hidden -mt-20 pt-20">
      {/* Glow decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] z-0"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(168,85,247,0.25) 0%, rgba(168,85,247,0.08) 35%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.12), transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 container py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/assets/images/logo-grande.png" alt="Juninhos" className="h-[36px]" />
        </Link>
        <Link
          to="/"
          className="text-text-muted text-sm hover:text-primary transition-colors flex items-center gap-2"
        >
          <span aria-hidden="true">←</span> Voltar ao site
        </Link>
      </header>

      <main className="relative z-10 container grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 py-10 lg:py-16 items-start">
        {/* LEFT: branding */}
        <section className="hidden lg:block pt-8">
          <span className="section-eyebrow">{tagline.eyebrow}</span>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight mb-5 bg-[linear-gradient(135deg,#A855F7_0%,#00E5FF_100%)] bg-clip-text text-transparent transition-all duration-500">
            {tagline.title}
          </h1>
          <p className="text-text-muted text-lg leading-relaxed mb-10 max-w-[520px]">
            {tagline.sub}
          </p>

          <div className="border-l-2 border-primary/30 pl-6">
            <span
              className="block text-[0.7rem] uppercase tracking-[0.22em] text-primary mb-4 font-semibold"
              style={{ fontFamily: MONO }}
            >
              / o que vem junto
            </span>
            <ul className="flex flex-col gap-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-text-muted">
                  <span className="text-cyan shrink-0 mt-1 text-xs" style={{ fontFamily: MONO }}>
                    ▶
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* RIGHT: form */}
        <section className="w-full max-w-[460px] mx-auto lg:ml-auto">
          {/* Mobile-only tagline */}
          <div className="lg:hidden mb-8 text-center">
            <span className="section-eyebrow !mb-2">{tagline.eyebrow}</span>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2 bg-[linear-gradient(135deg,#A855F7_0%,#00E5FF_100%)] bg-clip-text text-transparent">
              {tagline.title}
            </h1>
            <p className="text-text-muted text-sm">{tagline.sub}</p>
          </div>

          {/* Tabs */}
          {tab !== 'forgot' && (
            <div className="relative flex p-1 rounded-xl bg-surface/40 border border-white/[0.06] backdrop-blur-md mb-6">
              <span
                aria-hidden="true"
                className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-lg bg-primary shadow-[0_0_20px_rgba(168,85,247,0.45)] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: tab === 'login' ? 'translateX(0)' : 'translateX(100%)' }}
              />
              <button
                type="button"
                onClick={() => switchTab('login')}
                className={`relative flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                  tab === 'login' ? 'text-white' : 'text-text-muted hover:text-text-main'
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => switchTab('register')}
                className={`relative flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                  tab === 'register' ? 'text-white' : 'text-text-muted hover:text-text-main'
                }`}
              >
                Criar Conta
              </button>
            </div>
          )}

          {/* Forms */}
          <div className="relative card-item !p-8">
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="form-group !mb-0">
                  <label htmlFor="login-email">E-mail</label>
                  <input type="email" id="login-email" name="email" required placeholder="seu@email.com" autoComplete="email" />
                </div>
                <div className="form-group !mb-0">
                  <label htmlFor="login-password" className="flex justify-between items-center">
                    <span>Senha</span>
                    <button
                      type="button"
                      onClick={() => switchTab('forgot')}
                      className="text-xs text-primary hover:text-cyan transition-colors normal-case font-normal"
                    >
                      Esqueci a senha
                    </button>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="login-password"
                      name="password"
                      required
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="!pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
                    >
                      <EyeIcon visible={showPassword} />
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn-submit mt-2" disabled={submitting}>
                  {submitting ? 'Entrando…' : 'Entrar no portal'}
                </button>
              </form>
            )}

            {tab === 'register' && (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div className="form-group !mb-0">
                  <label htmlFor="reg-name">Nome completo</label>
                  <input type="text" id="reg-name" name="name" required placeholder="Seu nome" autoComplete="name" />
                </div>
                <div className="form-group !mb-0">
                  <label htmlFor="reg-email">E-mail</label>
                  <input type="email" id="reg-email" name="email" required placeholder="seu@email.com" autoComplete="email" />
                </div>
                <div className="form-group !mb-0">
                  <label htmlFor="reg-password">Senha</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="reg-password"
                      name="password"
                      required
                      placeholder="Min 8, maiúscula, número e símbolo"
                      autoComplete="new-password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="!pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
                    >
                      <EyeIcon visible={showPassword} />
                    </button>
                  </div>
                  {registerPassword && (
                    <div className="mt-2">
                      <div className="flex gap-1 h-1">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-full transition-colors duration-200 ${
                              i < strength ? STRENGTH_BAR_CLASS[strength] : 'bg-surface-alt'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs mt-1.5 text-text-muted">
                        Força:{' '}
                        <span className={`font-semibold ${STRENGTH_TEXT_CLASS[strength]}`}>
                          {STRENGTH_LABELS[strength]}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="form-group !mb-0">
                  <label htmlFor="reg-confirm">Confirmar senha</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="reg-confirm"
                    name="confirm"
                    required
                    placeholder="Repita a senha"
                    autoComplete="new-password"
                  />
                </div>
                <button type="submit" className="btn-submit mt-2" disabled={submitting}>
                  {submitting ? 'Criando conta…' : 'Criar minha conta'}
                </button>
                <p className="text-xs text-text-muted text-center">
                  Ao criar uma conta você concorda com nossos termos de uso.
                </p>
              </form>
            )}

            {tab === 'forgot' && (
              <form onSubmit={handleForgot} className="flex flex-col gap-4">
                <div className="form-group !mb-0">
                  <label htmlFor="forgot-email">Seu e-mail cadastrado</label>
                  <input type="email" id="forgot-email" name="email" required placeholder="seu@email.com" autoComplete="email" />
                </div>
                <button type="submit" className="btn-submit mt-2" disabled={submitting}>
                  {submitting ? 'Enviando…' : 'Enviar link de recuperação'}
                </button>
                <button
                  type="button"
                  onClick={() => switchTab('login')}
                  className="text-sm text-primary hover:text-cyan transition-colors self-center mt-1"
                >
                  ← Voltar ao login
                </button>
              </form>
            )}
          </div>

          {feedback && (
            <div className={`form-feedback ${feedback.type} mt-4`}>{feedback.msg}</div>
          )}

          {tab !== 'forgot' && (
            <p className="text-center text-text-muted text-xs mt-6" style={{ fontFamily: MONO }}>
              {tab === 'login' ? '// nova por aqui? ' : '// já tem conta? '}
              <button
                type="button"
                onClick={() => switchTab(tab === 'login' ? 'register' : 'login')}
                className="text-primary hover:text-cyan transition-colors"
              >
                {tab === 'login' ? 'Crie uma conta' : 'Entre na sua conta'}
              </button>
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
