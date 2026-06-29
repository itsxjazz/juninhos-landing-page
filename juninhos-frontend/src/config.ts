const PUBLIC_FALLBACK = "https://juninhos-landing-page.onrender.com/api"
const ENV_API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim()
const ENV_AUTH_BASE = (import.meta.env.VITE_AUTH_API_BASE_URL as string | undefined)?.trim()

export const CONFIG = {
	// Endpoints públicos (projetos, aulas, waitlist, instrutor)
	API_BASE_URL: ENV_API_BASE || PUBLIC_FALLBACK,
	// Endpoints de auth/portal — pode apontar pra backend local enquanto o de prod não tiver as rotas novas
	AUTH_BASE_URL: ENV_AUTH_BASE || ENV_API_BASE || PUBLIC_FALLBACK,
	ENDPOINTS: {
		PROJECTS: "/projects",
		PROJECT_REGISTRATION: "/project-registration",
		CLASSES: "/classes",
		WAITLIST: "/waitlist",
		INSTRUCTOR: "/instructor",
		REGISTER: "/register",
		LOGIN: "/login",
		FORGOT_PASSWORD: "/forgot-password",
		RESET_PASSWORD: "/reset-password",
		PORTAL_AUTH: "/portal/auth",
		SUPPORTERS: "/supporters",
	},
	RETRY_DELAY: 5000,
} as const
