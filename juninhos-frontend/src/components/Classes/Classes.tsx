import { useEffect, useState } from "react"
import { CONFIG } from "../../config"
import { useApiList } from "../../hooks/useApiList"
import type { ClassItem } from "../../types"
import { formatStatusClass } from "../../utils/formatStatus"

interface ClassesProps {
	onCardsRendered?: () => void
}

export function Classes({ onCardsRendered }: ClassesProps) {
	const { data: classes, loaded } = useApiList<ClassItem>(CONFIG.ENDPOINTS.CLASSES)
	const [selectedTheme, setSelectedTheme] = useState<string>("Todos")
	const [selectedStatus, setSelectedStatus] = useState<string>("Todos")

	useEffect(() => {
		if (loaded && onCardsRendered) {
			requestAnimationFrame(() => onCardsRendered())
		}
	}, [loaded, onCardsRendered])

	const filteredClasses = classes
		?.slice()
		.reverse()
		.filter((c) => {
			const matchesTheme = selectedTheme === "Todos" || c.tema === selectedTheme
			const matchesStatus = selectedStatus === "Todos" || c.status === selectedStatus
			return matchesTheme && matchesStatus
		})

	return (
		<section id="classes" className="classes-section container">
			<header className="section-header-left">
				<span className="section-eyebrow">04 · Aulas</span>
				<h2 className="section-title">Próximas Aulas</h2>
				<p className="section-subtitle">
					Conhecimento compartilhado por quem está no mercado ou também está aprendendo.
				</p>
			</header>

			<div className="flex flex-wrap gap-4 mb-8 bg-white/[0.02] p-4 rounded-xl border border-white/[0.05] max-w-[760px]">
				<div className="flex flex-col gap-1.5 min-w-[200px] flex-1">
					<label htmlFor="theme-filter" className="text-xs uppercase tracking-wider text-text-muted font-semibold">
						Filtrar por Tema
					</label>
					<select
						id="theme-filter"
						value={selectedTheme}
						onChange={(e) => setSelectedTheme(e.target.value)}
						className="w-full p-2.5 border border-white/[0.08] rounded-md bg-surface text-text-main focus:outline-none focus:border-primary text-sm cursor-pointer"
					>
						<option value="Todos">Todos os Temas</option>
						<option value="Dados">Dados</option>
						<option value="Front-end">Front-end</option>
						<option value="Back-end">Back-end</option>
						<option value="Full-stack">Full-stack</option>
						<option value="IA">IA</option>
						<option value="DevOps">DevOps</option>
						<option value="Outro">Outro</option>
						<option value="Carreira/Soft Skills">Carreira/Soft Skills</option>
					</select>
				</div>
				<div className="flex flex-col gap-1.5 min-w-[200px] flex-1">
					<label htmlFor="status-filter" className="text-xs uppercase tracking-wider text-text-muted font-semibold">
						Filtrar por Status
					</label>
					<select
						id="status-filter"
						value={selectedStatus}
						onChange={(e) => setSelectedStatus(e.target.value)}
						className="w-full p-2.5 border border-white/[0.08] rounded-md bg-surface text-text-main focus:outline-none focus:border-primary text-sm cursor-pointer"
					>
						<option value="Todos">Todos os Status</option>
						<option value="Concluída">Concluída</option>
						<option value="Vem por aí">Vem por aí</option>
					</select>
				</div>
			</div>

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
					: filteredClasses && filteredClasses.length > 0
					? filteredClasses.map((c, idx) => {
							return (
								<li
									key={`${c.titulo}-${idx}`}
									className="class-card grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-3 md:gap-8 py-6 group transition-colors hover:bg-white/[0.015] px-2"
								>
									<div className="font-mono text-sm text-text-muted md:pt-1 flex flex-col gap-1">
										<span className="text-primary group-hover:text-cyan transition-colors">
											{c.data}
										</span>
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

									<div className="md:self-start flex flex-col gap-2 items-start md:items-end">
										<span className={`status-badge ${formatStatusClass(c.status)}`}>{c.status}</span>
										{c.tema && (
											<span className={`status-badge ${formatStatusClass(c.tema)}`}>{c.tema}</span>
										)}
									</div>
								</li>
							)
						})
					: (
						<li className="py-8 text-center text-text-muted">
							Nenhuma aula encontrada para os filtros selecionados.
						</li>
					)}
			</ul>
		</section>
	)
}