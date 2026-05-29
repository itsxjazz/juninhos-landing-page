import { useModal } from "../../context/ModalContext"

export function Ecosystem() {
	const { openInstructor } = useModal()

	return (
		<section id="ecosystem" className="ecosystem-section container">
			<header className="section-header-left">
				<span className="section-eyebrow">02 · Ecossistema</span>
				<h2 className="section-title">Os pilares da comunidade</h2>
				<p className="section-subtitle">Três frentes que sustentam tudo o que fazemos juntos.</p>
			</header>
			<div className="cards-grid">
				<article className="card-item static-card">
					<h3>Aulas e Mentorias</h3>
					<p>
						Aprenda e ensine. Uma troca constante de conhecimento entre membros de todos os níveis.
					</p>
					<button className="link-btn primary mt-4 w-full" onClick={openInstructor}>
						Quero ser instrutor
					</button>
				</article>
				<article className="card-item static-card">
					<h3>Projetos e Squads</h3>
					<p>
						Saia da teoria. Colabore em squads para criar soluções reais e fortalecer seu portfólio.
					</p>
				</article>
				<article className="card-item static-card">
					<h3>Networking e Comunidade</h3>
					<p>
						Conexões valiosas e suporte mútuo através de grupos no WhatsApp e salas de pair no
						Discord.
					</p>
				</article>
			</div>
		</section>
	)
}
