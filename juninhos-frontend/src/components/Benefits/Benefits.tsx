const BENEFITS = [
	{
		title: "Crescimento Exponencial",
		body: "Alcançamos mais de 150 membros em menos de 48 horas. A lista ajuda a organizar a entrada para mantermos a qualidade e a organização.",
	},
	{
		title: "Prioridade nos Squads",
		body: "Quem está na lista terá prioridade para preencher as vagas nos próximos projetos colaborativos e grupos de estudo.",
	},
	{
		title: "Apoio Colaborativo",
		body: "Garanta seu lugar em um ambiente seguro para tirar dúvidas com uma rede de pessoas que estão aprendendo juntas.",
	},
	{
		title: "Foco em Prática Real",
		body: "Saia dos tutoriais infinitos e venha construir soluções de verdade.",
	},
]

export function Benefits() {
	return (
		<section id="benefits" className="benefits-section container">
			<header className="section-header-left">
				<span className="section-eyebrow">06 · Benefícios</span>
				<h2 className="section-title">Por que entrar na lista?</h2>
				<p className="section-subtitle">O que muda quando você reserva seu lugar agora.</p>
			</header>
			<div className="cards-grid">
				{BENEFITS.map(b => (
					<article key={b.title} className="card-item benefit-card">
						<h3>{b.title}</h3>
						<p>{b.body}</p>
					</article>
				))}
			</div>
		</section>
	)
}
