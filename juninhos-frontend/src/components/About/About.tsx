import { useDiscordStats } from "../../hooks/useDiscordStats"

const DISCORD_INVITE_CODE = import.meta.env.VITE_DISCORD_INVITE_CODE as string | undefined

const ABOUT_BLOCKS = [
	{
		label: "O que é",
		body: "A Juninhos é uma comunidade colaborativa dedicada a conectar entusiastas e profissionais de tecnologia, abrangendo as áreas de desenvolvimento de software, jogos, dados e inteligência artificial. Composta por membros que vão desde estudantes em seus primeiros passos até profissionais de nível avançado, a comunidade busca ser um ponto de encontro para a troca de conhecimento e o fortalecimento de carreiras.",
	},
	{
		label: "Propósito",
		body: "Nosso propósito central é estabelecer um ambiente seguro e de apoio mútuo, focado especialmente em quem está iniciando sua jornada na tecnologia. Acreditamos na mentoria orgânica e na democratização da informação, onde o conhecimento circula de forma horizontal. Um dos pilares da nossa dinâmica são as aulas e mentorias realizadas pelos próprios membros, promovendo uma troca rica onde todos têm algo a ensinar e a aprender.",
	},
	{
		label: "Origem",
		body: "A iniciativa surgiu espontaneamente como um grupo de networking e estudos. O crescimento acelerado e o alto nível de engajamento transformaram o projeto em um ecossistema estruturado. Atualmente, a Juninhos oferece subgrupos temáticos para discussões específicas, salas de pair programming no Discord e um hub de repositórios centralizado no GitHub para o desenvolvimento de soluções em conjunto.",
	},
	{
		label: "Prática",
		body: "Na Juninhos, defendemos que a teoria deve ser rapidamente aplicada na prática. Por isso, organizamos squads para a criação de projetos colaborativos reais, incentivando o trabalho em equipe e a simulação de desafios do dia a dia profissional. Seja no desenvolvimento web, na análise de dados, no desenvolvimento de games ou na implementação de modelos de IA, a Juninhos é o espaço para quem deseja evoluir tecnicamente através da prática e da colaboração coletiva.",
	},
]

export function About() {
	const discord = useDiscordStats(DISCORD_INVITE_CODE)
	const memberCount = discord.total ?? discord.online
	const roundedMemberCount = Math.floor(memberCount !== null ? memberCount / 100 : 0) * 100
	const formattedMemberCount =
		roundedMemberCount >= 1000 ? `${roundedMemberCount / 1000}K` : roundedMemberCount.toString()
	const membersDisplay = memberCount !== null ? `+${formattedMemberCount}` : "+300"
	const membersLabel = discord.total !== null ? "Membros na Comunidade" : "Membros na Comunidade"

	return (
		<section id="about" className="about-section container">
			<header className="section-header-left">
				<span className="section-eyebrow">01 · Sobre</span>
				<h2 className="section-title">O que é a Juninhos?</h2>
				<p className="section-subtitle">A comunidade colaborativa onde teoria vira código.</p>
			</header>

			<div className="grid md:grid-cols-2 gap-x-10 gap-y-20">
				{ABOUT_BLOCKS.map(block => (
					<div
						key={block.label}
						className="relative pl-5 border-l-2 border-primary/30 hover:border-primary/70 transition-colors duration-300 max-w-4/5"
					>
						<span
							className="block text-primary text-[0.7rem] uppercase tracking-[0.22em] mb-3 font-semibold"
							style={{ fontFamily: "'Fira Code', Menlo, Consolas, monospace" }}
						>
							/ {block.label}
						</span>
						<p className="text-text-muted leading-relaxed text-[1rem]">{block.body}</p>
					</div>
				))}
			</div>

			<div className="stats-grid mt-32">
				<div className="stat-item card-item">
					<strong className={discord.loading ? "opacity-60" : ""}>{membersDisplay}</strong>
					<span>{membersLabel}</span>
				</div>
				<div className="stat-item card-item">
					<span>Fundada em</span>
					<strong>Abril de 2026</strong>
				</div>
				<div className="stat-item card-item">
					<strong>Projetos Reais</strong>
					<span>Sendo Codados Agora</span>
				</div>
			</div>
		</section>
	)
}
