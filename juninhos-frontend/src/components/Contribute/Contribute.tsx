export function Contribute() {
	return (
		<section
			id="contribute"
			className="contribute-section relative overflow-hidden py-36 mt-16 border-t border-b border-[rgba(168,85,247,0.3)] bg-[linear-gradient(135deg,rgba(20,17,30,1)_0%,rgba(45,20,80,1)_100%)]"
		>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_70%)]" />
			<div className="container">
				<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12">
					<div className="contribute-card flex flex-col items-center justify-center text-center px-8 py-12 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-transform duration-300">
						<h2 className="section-title !text-[1.8rem] !mb-4 !text-white">Apoie nossa Causa</h2>
						<p className="mb-8 text-white/80">
							A Juninhos é feita de pessoas para pessoas! <br /> Sua contribuição ajuda a manter
							servidores e infraestrutura gratuitos.
						</p>
						<a
							href="https://apoia.se/juninhos"
							target="_blank"
							rel="noreferrer"
							className="link-btn primary !w-full !max-w-[280px] !p-4"
						>
							Nosso Apoia.se
						</a>
					</div>
					<div className="contribute-card flex flex-col items-center justify-center text-center px-8 py-12 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-transform duration-300">
						<h2 className="section-title !text-[1.8rem] !mb-4 !text-white">Para Empresas</h2>
						<p className="mb-8 text-white/80">
							Deseja apoiar a iniciativa, contratar talentos ou propor parcerias? <br /> Entre em
							contato com nossa gestão.
						</p>
						<a
							href="mailto:contato@juninhos.com"
							className="link-btn secondary !w-full !max-w-[280px] !p-4 !bg-primary/10 !border !border-primary/40"
						>
							contato@juninhos.com
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
