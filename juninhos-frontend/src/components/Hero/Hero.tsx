import { useMemo } from "react"
import Typewriter from "typewriter-effect"

const BG_BASE = "/assets/images/background"

const LOGOS = [
	{ src: `${BG_BASE}/Typescript_logo_2020.svg.png`, alt: "TypeScript" },
	{ src: `${BG_BASE}/javascript-logo.svg`, alt: "JavaScript" },
	{ src: `${BG_BASE}/react-js-icon.svg`, alt: "React" },
	{ src: `${BG_BASE}/python.svg`, alt: "Python" },
	{ src: `${BG_BASE}/java_original_logo_icon_146458.png`, alt: "Java" },
	{ src: `${BG_BASE}/go-programming-language-icon.svg`, alt: "Go" },
	{ src: `${BG_BASE}/c-sharp-programming-language-icon.svg`, alt: "C#" },
	{ src: `${BG_BASE}/c-program-icon.svg`, alt: "C" },
	{ src: `${BG_BASE}/logo_php.png`, alt: "PHP" },
	{ src: `${BG_BASE}/ruby-programming-language-icon.svg`, alt: "Ruby" },
	{ src: `${BG_BASE}/rust-programming-language-icon.svg`, alt: "Rust" },
	{ src: `${BG_BASE}/kotlin-programming-language-icon.svg`, alt: "Kotlin" },
	{ src: `${BG_BASE}/flutter-icon.svg`, alt: "Flutter" },
	{ src: `${BG_BASE}/laravel-icon.svg`, alt: "Laravel" },
	{ src: `${BG_BASE}/mysql-icon.svg`, alt: "MySQL" },
	{ src: `${BG_BASE}/postgresql-icon.svg`, alt: "PostgreSQL" },
	{ src: `${BG_BASE}/sql-server-icon.svg`, alt: "SQL Server" },
]

const POSITIONS = [
	// Top (2 esq + 2 dir)
	{ top: "4%", left: "6%" },
	{ top: "6%", left: "26%" },
	{ top: "6%", left: "70%" },
	{ top: "4%", left: "90%" },
	// Upper sides
	{ top: "24%", left: "4%" },
	{ top: "24%", left: "90%" },
	// Middle sides
	{ top: "46%", left: "2%" },
	{ top: "46%", left: "92%" },
	// Lower sides
	{ top: "66%", left: "6%" },
	{ top: "66%", left: "88%" },
	// Bottom
	{ top: "78%", left: "16%" },
	{ top: "78%", left: "78%" },
]

const ANIMS = [
	"var(--animate-float-slow)",
	"var(--animate-float-medium)",
	"var(--animate-float-fast)",
]

function shuffle<T>(arr: T[]): T[] {
	const copy = [...arr]

	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))

		const current = copy[i]!
		const random = copy[j]!

		copy[i] = random
		copy[j] = current
	}

	return copy
}

function pick<T>(arr: T[]): T {
	if (arr.length === 0) {
		throw new Error("Cannot pick from empty array")
	}

	return arr[Math.floor(Math.random() * arr.length)]!
}

export function Hero() {
	// Antes: abríamos o modal de lista de espera.
	// const { openWaitlist } = useModal()

	const floatingLogos = useMemo(() => {
		const pool = shuffle(LOGOS)
		return POSITIONS.map((pos, i) => {
			const logo = pool[i % pool.length]!
			return {
				key: `${logo.alt}-${i}`,
				src: logo.src,
				...pos,
				size: 44, // tamanho fixo pra consistência visual
				anim: pick(ANIMS),
				delay: `${(Math.random() * 4).toFixed(2)}s`,
			}
		})
	}, [])

	const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		const target = document.getElementById("about")
		if (target) {
			window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" })
		}
	}

	return (
		<section
			id="hero"
			className="hero-section w-full h-[92vh] flex flex-col items-center justify-center text-center relative overflow-hidden bg-no-repeat bg-center bg-cover [background-blend-mode:overlay] before:content-[''] before:absolute before:inset-0 before:z-[1]"
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 z-[1] w-screen h-[68vh] max-md:h-[58vh]"
			>
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.6)_0%,rgba(168,85,247,0.3)_22%,rgba(139,92,246,0.1)_45%,transparent_65%)]" />
				{floatingLogos.map(logo => (
					<img
						key={logo.key}
						src={logo.src}
						alt=""
						className="absolute grayscale opacity-50 select-none"
						style={{
							top: logo.top,
							left: logo.left,
							width: logo.size,
							height: logo.size,
							animation: logo.anim,
							animationDelay: logo.delay,
						}}
					/>
				))}
			</div>

			<div className="container hero-text relative z-[2] flex flex-col items-center max-w-[900px]">
				<h1 className="hero-title text-[clamp(2rem,6vw,4rem)] font-extrabold leading-[1.1] mb-10 [letter-spacing:-1.5px] bg-[linear-gradient(135deg,#7924ec_0%,#db87f9_100%)] bg-clip-text text-transparent">
					A comunidade {""}
					<Typewriter
						options={{
							strings: [
								"onde a teoria encontra a prática.",
								"que conecta júniores a profissionais experientes.",
								"colaborativa onde teoria vira código.",
							],
							autoStart: true,
							loop: true,
							deleteSpeed: 50,
							delay: 50,
						}}
					/>
				</h1>
				<p className="hero-subtitle text-[1.1rem] text-text-muted max-w-[600px] mb-14">
					Conectando talentos do nível júnior ao avançado para construir o futuro através do código.
				</p>
				<a
					href="https://discord.gg/3VmKgv8Yny"
					target="_blank"
					rel="noopener noreferrer"
					className="primary-cta !bg-transparent !text-cyan !border-2 !border-cyan !px-[1.8rem] !py-[0.9rem] !rounded-xl !font-semibold !text-base flex items-center transition-all duration-300 hover:!bg-cyan hover:!text-bg hover:!shadow-[0_0_20px_rgba(0,229,255,0.4)] before:content-['>_'] before:font-mono before:pr-2"
				>
					Entre na comunidade
				</a>
			</div>
			<a
				href="#about"
				aria-label="Rolar para baixo"
				onClick={handleScrollDown}
				className="absolute bottom-14 left-1/2 w-[25px] h-[25px] border-r-4 border-b-4 border-cyan -translate-x-1/2 z-10 cursor-pointer transition-all duration-300 hover:border-primary [animation:var(--animate-bounce-arrow)]"
				style={{ transform: "translateX(-50%) rotate(45deg)" }}
			/>
		</section>
	)
}
