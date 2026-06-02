export interface ProjectLinks {
	imagem?: string
	deploy?: string
	github?: string
}

export interface Project {
	titulo: string
	status: string
	descricao_simples?: string
	descricao?: string
	descricao_detalhada?: string
	stack: string | string[]
	membros: string | string[]
	links: ProjectLinks
}

export interface ClassItem {
	titulo: string
	status: string
	desc: string
	mentor: string
	data: string
	canal: string
	tema?: string
}

export interface Supporter {
	name: string
	tier: ""
	github?: string
	portfolio?: string
	linkedin?: string
}

export type FeedbackType = "success" | "error"

export interface WaitlistFormData {
	name: string
	phone: string
	level: string
	areas: string[]
	technologies: string
}

export interface InstructorFormData {
	name: string
	discord: string
	whatsapp: string
	theme: string
	title: string
	description: string
	level: string
	days: string[]
	shift: string
	support: string
}

export interface ApiResponse {
	message: string
	error?: string
}
