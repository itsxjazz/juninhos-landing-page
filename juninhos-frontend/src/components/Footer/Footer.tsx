const NAV_LINKS = [
	{ href: "#about", label: "Sobre" },
	{ href: "#ecosystem", label: "Ecossistema" },
	{ href: "#projects", label: "Projetos" },
	{ href: "#community", label: "Redes" },
	{ href: "#benefits", label: "Benefícios" },
]

const SOCIALS = [
	{ href: "https://linkedin.com/company/juninhos", label: "LinkedIn" },
	{ href: "https://x.com/devsjuninhos", label: "Twitter (X)" },
	{ href: "https://www.instagram.com/devsjuninhos/", label: "Instagram" },
]

const linkClass = "text-[#ccc] transition-colors duration-200 hover:text-primary"

export function Footer() {
	return (
		<footer className="main-footer relative bg-secondary text-white pt-16 pb-8 mt-auto border-t border-[rgba(168,85,247,0.25)] text-sm">
			<div className="container grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 mb-12">
				<div className="footer-brand w-full md:mx-auto">
					<div className="mb-6">
						<img
							src="/assets/images/logo-grande.png"
							alt="Juninhos"
							className="h-[45px] w-auto object-contain"
						/>
					</div>
					<p className="font-light">
						A comunidade onde a teoria encontra a prática através do código e da colaboração
						coletiva.
					</p>
				</div>

				<div className="footer-links w-full md:mx-auto">
					<h4 className="font-medium mb-2">Navegação</h4>
					<ul>
						{NAV_LINKS.map(l => (
							<li key={l.href} className="mb-2">
								<a href={l.href} className={linkClass}>
									{l.label}
								</a>
							</li>
						))}
					</ul>
				</div>

				<div className="footer-socials w-full md:mx-auto">
					<h4 className="font-medium mb-2">Redes Sociais</h4>
					<ul>
						{SOCIALS.map(s => (
							<li key={s.href} className="mb-2">
								<a href={s.href} target="_blank" rel="noreferrer" className={linkClass}>
									{s.label}
								</a>
							</li>
						))}
					</ul>
				</div>

				<div className="footer-apoia w-full md:mx-auto">
					<h4 className="font-medium mb-2">Contribua</h4>
					<ul>
						<li className="mb-2">
							<a
								href="https://apoia.se/juninhos"
								target="_blank"
								rel="noreferrer"
								className={linkClass}
							>
								Apoia.se
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="footer-bottom container text-center border-t border-white/10 pt-8 text-[#aaa] text-xs">
				<p>&copy; {new Date().getFullYear()} Juninhos. Desenvolvido pela nossa comunidade.</p>
			</div>
		</footer>
	)
}
