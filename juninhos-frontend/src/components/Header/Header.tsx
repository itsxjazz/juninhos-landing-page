import { useCallback, useEffect, useState } from "react"

const NAV_LINKS = [
	{ href: "#about", label: "Sobre" },
	{ href: "#ecosystem", label: "Ecossistema" },
	{ href: "#projects", label: "Projetos" },
	{ href: "#community", label: "Redes" },
	{ href: "#benefits", label: "Benefícios" },
	{ href: "#contribute", label: "Apoiar" },
]

export function Header() {
	// Antes: o botão abria o modal de lista de espera.
	// const { openWaitlist } = useModal()
	const [mobileOpen, setMobileOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 30)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	const closeMenu = useCallback(() => {
		setMobileOpen(false)
		document.body.style.overflow = "auto"
	}, [])

	const toggleMenu = useCallback(() => {
		setMobileOpen(prev => {
			const next = !prev
			document.body.style.overflow = next ? "hidden" : "auto"
			return next
		})
	}, [])

	useEffect(() => {
		return () => {
			document.body.style.overflow = "auto"
		}
	}, [])

	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		const targetId = e.currentTarget.getAttribute("href")
		if (!targetId) return
		const target = document.querySelector(targetId) as HTMLElement | null
		if (target) {
			const headerHeight = 80
			window.scrollTo({
				top: target.offsetTop - headerHeight,
				behavior: "smooth",
			})
		}
		closeMenu()
	}

// 	const handleCtaClick = () => {
// 		closeMenu()
// 		openWaitlist()
// 	}

	return (
		<header
			className={`main-header fixed top-0 left-0 right-0 mx-auto w-full z-[100] bg-[rgba(20,17,30,0.78)] backdrop-blur-[18px] backdrop-saturate-[160%] border border-[rgba(168,85,247,0.22)] shadow-[0_10px_30px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.02)_inset] transition-[max-width,margin-top,border-radius] duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] max-md:backdrop-blur-none max-md:bg-[rgba(20,17,30,0.92)] ${
				scrolled
					? "mt-3 max-w-[min(1080px,calc(100%-2rem))] rounded-full"
					: "mt-0 max-w-full rounded-none"
			}`}
		>
			<div
				className={`container flex items-center justify-start gap-8 !pl-8 !pr-7 max-md:!pl-6 max-md:!pr-5 transition-[height] duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
					scrolled ? "h-[60px]" : "h-[80px]"
				}`}
			>
				<div className="mr-auto">
					<a
						href="#hero"
						aria-label="Ir para o topo"
						onClick={handleNavClick}
						className="block h-[30px] transition-[height] duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
					>
						<img src="/assets/images/logo-grande.png" alt="Juninhos" className="h-[90%]" />
					</a>
				</div>

				<nav aria-label="Navegação principal">
					<ul
						className={`nav-menu flex items-center gap-6 max-md:fixed max-md:inset-0 max-md:left-auto max-md:w-screen max-md:h-screen max-md:m-0 max-md:bg-bg max-md:rounded-none max-md:flex-col max-md:justify-center max-md:gap-8 max-md:transition-[right] max-md:duration-[350ms] max-md:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] max-md:z-[999] max-md:pt-20 max-md:pb-8 max-md:px-6 max-md:-top-[10px] ${
						mobileOpen ? "max-md:right-0" : "max-md:-right-[150%]"
					}`}
					>
						{NAV_LINKS.map(link => (
							<li key={link.href} className="max-md:w-full max-md:text-center">
								<a
									href={link.href}
									onClick={handleNavClick}
									className="font-medium text-text-muted transition-colors duration-200 hover:text-primary max-md:text-[1.4rem] max-md:block max-md:w-full"
								>
									{link.label}
								</a>
							</li>
						))}
						<li className="max-md:w-full max-md:text-center">
							<a
								href="https://discord.gg/3VmKgv8Yny"
								target="_blank"
								rel="noopener noreferrer"
								onClick={closeMenu}
								className="nav-cta !px-[1.1rem] !py-2 !text-[0.9rem] max-md:!w-[min(80%,300px)] max-md:mx-auto rounded-full"
							>
								Entre na comunidade
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
