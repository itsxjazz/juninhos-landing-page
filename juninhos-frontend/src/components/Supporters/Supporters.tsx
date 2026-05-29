import type { Supporter } from "../../types"
import { CONFIG } from "../../config"
import { useApiList } from "../../hooks/useApiList"

const TIER_LABEL: Record<string, string> = {
	junior: "Júnior",
	pleno: "Pleno",
	senior: "Sênior",
	especialista: "Especialista",
}

const IconGithub = () => (
	<svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.4-2.3 1.1-3.1-.1-.3-.5-1.4.1-3 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.7.1 3 .7.8 1.1 1.8 1.1 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5z" />
	</svg>
)

const IconLinkedin = () => (
	<svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
		<path d="M19 0H5C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8 19H5V8h3v11zM6.5 6.7C5.5 6.7 4.8 6 4.8 5s.7-1.7 1.7-1.7S8.2 4 8.2 5s-.7 1.7-1.7 1.7zM20 19h-3v-5.6c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5V19z" />
	</svg>
)

const IconLink = () => (
	<svg
		className="w-3.5 h-3.5"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
		<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
	</svg>
)

const linkClassName =
	"inline-flex items-center gap-[0.35rem] px-3 py-[0.4rem] text-xs font-medium text-text-muted bg-white/[0.04] border border-white/[0.08] rounded-[8px] transition-all duration-200 hover:text-cyan hover:bg-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.3)] hover:-translate-y-px"

function SupporterCard({ supporter }: { supporter: Supporter }) {
	const initial = (supporter.name || "?").trim().charAt(0).toUpperCase()
	const tierKey = (supporter.tier || "")
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
	const tierLabel = TIER_LABEL[tierKey] || supporter.tier || "Apoiador"

	return (
		<article className="card-item flex flex-col items-center text-center gap-3 px-5 py-6 max-w-sm">
			<div
				aria-hidden="true"
				className="w-18 h-18 rounded-full flex items-center justify-center text-white font-bold text-[1.75rem] bg-linear-to-br from-primary to-cyan shadow-[0_0_24px_rgba(168,85,247,0.35)]"
			>
				{initial}
			</div>

			<h3 className="text-[1.05rem] font-bold text-text-main m-0">{supporter.name}</h3>

			{<span className={`supporter-tier ${tierKey}`}>{tierLabel}</span>}

			<div className="flex gap-2 mt-2 flex-wrap justify-center">
				{supporter.github && (
					<a
						href={supporter.github}
						target="_blank"
						rel="noreferrer"
						aria-label={`GitHub de ${supporter.name}`}
						className={linkClassName}
					>
						<IconGithub /> GitHub
					</a>
				)}
				{supporter.portfolio && (
					<a
						href={supporter.portfolio}
						target="_blank"
						rel="noreferrer"
						aria-label={`Portfolio de ${supporter.name}`}
						className={linkClassName}
					>
						<IconLink /> Portfolio
					</a>
				)}
				{supporter.linkedin && (
					<a
						href={supporter.linkedin}
						target="_blank"
						rel="noreferrer"
						aria-label={`LinkedIn de ${supporter.name}`}
						className={linkClassName}
					>
						<IconLinkedin /> LinkedIn
					</a>
				)}
			</div>
		</article>
	)
}

export function Supporters() {
	const { data: supporters } = useApiList<Supporter>(CONFIG.ENDPOINTS.SUPPORTERS)

	return (
		<section id="supporters" className="container">
			<header className="section-header-left">
				<span className="section-eyebrow">07 · Nossos Apoiadores</span>
				<h2 className="section-title">Quem torna isso possível</h2>
			</header>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
				{supporters
					?.slice()
					.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
					.map(supporter => (
						<SupporterCard key={supporter.name} supporter={supporter} />
					))}
			</div>
		</section>
	)
}
