import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CONFIG } from "../config"
import { useAuth, type AuthUser } from "../context/AuthContext"
import { ApiService } from "../services/api"

const MONO = "'Fira Code', Menlo, Consolas, monospace"

interface PortalLink {
	titulo: string
	url: string
}

interface PortalAuthResponse {
	success: boolean
	user: AuthUser
	mensagem: string
	links: PortalLink[]
}

// ===== SVG Icons (inline, sem libs) =====
const IconUser = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	</svg>
)
const IconBook = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
		<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
	</svg>
)
const IconRocket = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
		<path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
		<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
		<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
	</svg>
)
const IconBriefcase = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
		<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
	</svg>
)
const IconSettings = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="12" cy="12" r="3" />
		<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
	</svg>
)
const IconLogOut = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
		<polyline points="16 17 21 12 16 7" />
		<line x1="21" y1="12" x2="9" y2="12" />
	</svg>
)

const NAV_ITEMS = [
	{ id: "perfil", label: "Perfil", icon: <IconUser />, active: true },
	{ id: "aulas", label: "Aulas", icon: <IconBook /> },
	{ id: "projetos", label: "Projetos", icon: <IconRocket /> },
	{ id: "vagas", label: "Vagas", icon: <IconBriefcase /> },
	{ id: "config", label: "Configurações", icon: <IconSettings /> },
]

export function PortalPage() {
	const { user, logout } = useAuth()
	const navigate = useNavigate()
	const [data, setData] = useState<PortalAuthResponse | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let cancelled = false
		;(async () => {
			try {
				const res = await ApiService.fetchAuth<PortalAuthResponse>(CONFIG.ENDPOINTS.PORTAL_AUTH)
				if (!cancelled) setData(res)
			} catch (err) {
				if (cancelled) return
				const msg = err instanceof Error ? err.message : "Erro"
				setError(msg)
				if (msg.toLowerCase().includes("token") || msg.toLowerCase().includes("acesso")) {
					logout()
					navigate("/login", { replace: true })
				}
			} finally {
				if (!cancelled) setLoading(false)
			}
		})()
		return () => {
			cancelled = true
		}
	}, [logout, navigate])

	const handleLogout = () => {
		logout()
		navigate("/", { replace: true })
	}

	const displayUser = data?.user ?? user
	const initial = (displayUser?.name ?? "J").charAt(0).toUpperCase()
	const role = (displayUser?.role ?? "user").toUpperCase()

	return (
		<div className="min-h-screen bg-bg -mt-20">
			<div className="flex min-h-screen">
				{/* ====== SIDEBAR ====== */}
				<aside className="fixed left-0 top-0 bottom-0 w-[240px] bg-[rgba(15,13,22,0.95)] border-r border-white/[0.06] backdrop-blur-md flex flex-col z-50 max-md:hidden">
					<div className="px-5 py-5 border-b border-white/[0.06]">
						<Link to="/" className="flex items-center gap-2.5">
							<img src="/assets/images/logo-grande.png" alt="Juninhos" className="h-[26px]" />
							<span
								className="text-text-muted text-[0.65rem] uppercase tracking-[0.22em]"
								style={{ fontFamily: MONO }}
							>
								// Portal
							</span>
						</Link>
					</div>

					<nav aria-label="Navegação do portal" className="flex-1 px-3 py-4">
						<ul className="flex flex-col gap-0.5">
							{NAV_ITEMS.map(item => (
								<li key={item.id}>
									<a
										href="#"
										aria-current={item.active ? "page" : undefined}
										className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
											item.active
												? "bg-primary/15 text-cyan border-l-2 border-cyan -ml-[2px] pl-[10px]"
												: "text-text-muted hover:text-text-main hover:bg-white/[0.04]"
										}`}
									>
										<span className={item.active ? "text-cyan" : "text-text-muted"}>
											{item.icon}
										</span>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					<div className="border-t border-white/[0.06] p-3">
						<div className="flex items-center gap-3 px-2 py-2 rounded-lg">
							<div
								className="w-9 h-9 rounded-full bg-[linear-gradient(135deg,#A855F7_0%,#00E5FF_100%)] flex items-center justify-center text-white font-bold text-sm shrink-0"
								aria-hidden="true"
							>
								{initial}
							</div>
							<div className="flex-1 min-w-0">
								<div className="text-sm text-text-main font-semibold truncate">
									{displayUser?.name ?? "—"}
								</div>
								<div
									className="text-[0.65rem] text-text-muted truncate uppercase tracking-wider"
									style={{ fontFamily: MONO }}
								>
									{role}
								</div>
							</div>
							<button
								type="button"
								onClick={handleLogout}
								aria-label="Sair"
								className="text-text-muted hover:text-error transition-colors p-1"
							>
								<IconLogOut />
							</button>
						</div>
					</div>
				</aside>

				{/* ====== TOPBAR MOBILE ====== */}
				<header className="fixed top-0 left-0 right-0 h-[56px] bg-[rgba(15,13,22,0.95)] border-b border-white/[0.06] backdrop-blur-md md:hidden z-50 flex items-center justify-between px-4">
					<Link to="/" className="flex items-center gap-2">
						<img src="/assets/images/logo-grande.png" alt="Juninhos" className="h-[24px]" />
					</Link>
					<nav aria-label="Navegação mobile" className="flex-1 overflow-x-auto mx-4">
						<ul className="flex items-center gap-1 min-w-max">
							{NAV_ITEMS.map(item => (
								<li key={item.id}>
									<a
										href="#"
										className={`inline-block px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
											item.active ? "text-cyan bg-cyan/10" : "text-text-muted"
										}`}
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<button
						type="button"
						onClick={handleLogout}
						aria-label="Sair"
						className="text-text-muted"
					>
						<IconLogOut />
					</button>
				</header>

				{/* ====== MAIN ====== */}
				<main className="flex-1 md:ml-[240px] max-md:pt-[56px]">
					{/* Banner de capa com avatar */}
					<section className="relative !pt-0">
						<div
							className="h-[180px] md:h-[200px] relative overflow-hidden"
							style={{
								background:
									"linear-gradient(135deg, rgba(168,85,247,0.4) 0%, rgba(0,229,255,0.25) 60%, rgba(20,17,30,1) 100%), radial-gradient(ellipse at 20% 30%, rgba(168,85,247,0.5), transparent 60%)",
							}}
						>
							<div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />
							<div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg/80" />
						</div>

						<div className="px-6 md:px-10">
							<div className="flex items-end justify-between gap-4 -mt-12 md:-mt-14">
								<div
									className="w-[96px] h-[96px] z-1000 md:w-[112px] md:h-[112px] rounded-full bg-[linear-gradient(135deg,#A855F7_0%,#00E5FF_100%)] flex items-center justify-center text-white font-bold text-4xl md:text-5xl shrink-0 border-4 border-bg shadow-[0_0_40px_rgba(168,85,247,0.4)]"
									aria-hidden="true"
								>
									{initial}
								</div>
								<button
									type="button"
									className="link-btn secondary !px-4 !py-2 !text-sm shrink-0 mb-1"
								>
									Editar perfil
								</button>
							</div>

							<div className="mt-2">
								<h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1 leading-tight">
									{displayUser?.name ?? "Carregando..."}
								</h1>
								{data?.mensagem && <p className="text-text-muted text-sm mb-2">{data.mensagem}</p>}
								<div
									className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted"
									style={{ fontFamily: MONO }}
								>
									{displayUser?.email && <span>{displayUser.email}</span>}
									{displayUser?.email && <span aria-hidden="true">·</span>}
									<span className="text-primary font-semibold uppercase tracking-wider">
										{role}
									</span>
								</div>
							</div>
						</div>
					</section>

					{/* Conteúdo */}
					<div className="px-6 md:px-10 pb-8">
						{loading && (
							<div className="card-item !p-6 max-w-[600px] mt-6">
								<p className="text-text-muted">Carregando dados protegidos…</p>
							</div>
						)}

						{!loading && error && (
							<div className="form-feedback error max-w-[600px] mt-6">{error}</div>
						)}

						{!loading && data && (
							<section className="mt-6">
								<header className="flex items-center gap-2.5 mb-4">
									<span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
										<IconRocket />
									</span>
									<div>
										<h2 className="!mb-0 !text-base">Links exclusivos</h2>
										<p className="text-text-muted text-xs">Materiais e ferramentas para membros</p>
									</div>
								</header>

								{data.links.length === 0 ? (
									<div className="card-item !p-6 max-w-[600px]">
										<p className="text-text-muted text-sm">Nenhum link disponível no momento.</p>
									</div>
								) : (
									<div className="grid md:grid-cols-2 gap-3">
										{data.links.map(link => (
											<a
												key={link.titulo}
												href={link.url}
												target="_blank"
												rel="noreferrer"
												className="card-item group flex items-center gap-4 !p-5"
											>
												<span className="w-1 h-12 rounded-full bg-primary shrink-0 group-hover:bg-cyan transition-colors" />
												<div className="flex-1 min-w-0">
													<h3 className="!mb-1 !text-base">{link.titulo}</h3>
													<p className="text-text-muted text-sm truncate">{link.url}</p>
												</div>
												<span className="text-primary group-hover:text-cyan group-hover:translate-x-1 text-xl transition-all">
													→
												</span>
											</a>
										))}
									</div>
								)}
							</section>
						)}
					</div>
				</main>
			</div>
		</div>
	)
}
