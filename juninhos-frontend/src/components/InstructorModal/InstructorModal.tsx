import { useState, type FormEvent } from "react"
import { CONFIG } from "../../config"
import { useLoading } from "../../context/LoadingContext"
import { useModal } from "../../context/ModalContext"
import { ApiService } from "../../services/api"
import type { ApiResponse, FeedbackType, InstructorFormData } from "../../types"
import { maskPhone } from "../../utils/phoneMask"
import { Feedback } from "../Form/Feedback"
import { Modal } from "../Modal/Modal"

const THEMES = ["Front-end", "Back-end", "DevOps / Cloud", "Mobile", "Dados", "Gamedev", "Outro"]
const LEVELS = ["Iniciante", "Intermediário", "Avançado"]
const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
const SHIFTS = ["Manhã", "Tarde", "Noite", "Flexível"]
const SUPPORT_OPTIONS = [
	{ value: "Já sei como passar", label: "Já sei passar o conteúdo" },
	{
		value: "Preciso de ajuda no roteiro",
		label: "Preciso de ajuda no roteiro e/ou nos slides",
	},
	{
		value: "Ajuda com a vergonha",
		label: "Quero apoio para perder a vergonha",
	},
]

export function InstructorModal() {
	const { instructorOpen, closeInstructor } = useModal()
	const { show: showLoading, hide: hideLoading } = useLoading()

	const [form, setForm] = useState<InstructorFormData>({
		name: "",
		discord: "",
		whatsapp: "",
		theme: "",
		title: "",
		description: "",
		level: "",
		days: [],
		shift: "",
		support: "",
	})
	const [feedback, setFeedback] = useState<{
		message: string
		type: FeedbackType
	} | null>(null)
	const [submitting, setSubmitting] = useState(false)
	const [successMessage, setSuccessMessage] = useState<string | null>(null)

	const reset = () => {
		setForm({
			name: "",
			discord: "",
			whatsapp: "",
			theme: "",
			title: "",
			description: "",
			level: "",
			days: [],
			shift: "",
			support: "",
		})
		setFeedback(null)
		setSubmitting(false)
		setSuccessMessage(null)
	}

	const handleClose = () => {
		closeInstructor()
		setTimeout(reset, 300)
	}

	const update = <K extends keyof InstructorFormData>(key: K, value: InstructorFormData[K]) => {
		setForm(prev => ({ ...prev, [key]: value }))
	}

	const toggleDay = (day: string) => {
		setForm(prev => ({
			...prev,
			days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day],
		}))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setSubmitting(true)
		setFeedback(null)
		showLoading()

		try {
			const res = await ApiService.postData<ApiResponse>(CONFIG.ENDPOINTS.INSTRUCTOR, form)
			setSuccessMessage(res.message)
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Erro"
			setFeedback({ message: msg, type: "error" })
			setSubmitting(false)
		} finally {
			hideLoading()
		}
	}

	return (
		<Modal open={instructorOpen} onClose={handleClose}>
			<div className="w-full">
				<h2 className="section-title">Chamada de Instrutores</h2>

				{successMessage ? (
					<div className="text-center py-4">
						<h3 className="text-primary mb-4">Proposta Enviada!</h3>
						<p className="text-text-muted mb-4">{successMessage}</p>
						<button className="btn-success-close" onClick={handleClose}>
							Entendido
						</button>
					</div>
				) : (
					<>
						<p className="mb-8 text-center">
							Queremos mapear quem domina os assuntos que nossos squads precisam aprender. Se você
							tem algo a ensinar, preencha abaixo. A gente te ajuda com o roteiro se precisar!
						</p>

						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="inst-name">Nome completo *</label>
								<input
									type="text"
									id="inst-name"
									required
									placeholder="Seu nome"
									value={form.name}
									onChange={e => update("name", e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="inst-discord">Qual seu @ no Discord? *</label>
								<input
									type="text"
									id="inst-discord"
									required
									placeholder="ex: usuario#0000"
									value={form.discord}
									onChange={e => update("discord", e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="inst-whatsapp">WhatsApp *</label>
								<input
									type="tel"
									id="inst-whatsapp"
									required
									placeholder="(00) 00000-0000"
									value={form.whatsapp}
									onChange={e => update("whatsapp", maskPhone(e.target.value))}
								/>
							</div>

							<fieldset className="form-group">
								<legend>Tema principal *</legend>
								<div className="radio-group">
									{THEMES.map(t => (
										<label key={t}>
											<input
												type="radio"
												name="theme"
												value={t}
												required
												checked={form.theme === t}
												onChange={() => update("theme", t)}
											/>{" "}
											{t}
										</label>
									))}
								</div>
							</fieldset>

							<div className="form-group">
								<label htmlFor="inst-title">Título Sugerido para a Aula *</label>
								<input
									type="text"
									id="inst-title"
									required
									placeholder="Ex: Introdução ao React"
									value={form.title}
									onChange={e => update("title", e.target.value)}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="inst-desc">O que será ensinado? *</label>
								<textarea
									id="inst-desc"
									required
									placeholder="Breve resumo do conteúdo"
									value={form.description}
									onChange={e => update("description", e.target.value)}
								/>
							</div>

							<fieldset className="form-group">
								<legend>Nível da aula *</legend>
								<div className="radio-group">
									{LEVELS.map(lvl => (
										<label key={lvl}>
											<input
												type="radio"
												name="level"
												value={lvl}
												required
												checked={form.level === lvl}
												onChange={() => update("level", lvl)}
											/>{" "}
											{lvl}
										</label>
									))}
								</div>
							</fieldset>

							<fieldset className="form-group">
								<legend>Quais dias ficam melhores para você? *</legend>
								<div className="checkbox-group">
									{DAYS.map(d => (
										<label key={d}>
											<input
												type="checkbox"
												name="days"
												value={d}
												checked={form.days.includes(d)}
												onChange={() => toggleDay(d)}
											/>{" "}
											{d}
										</label>
									))}
								</div>
							</fieldset>

							<fieldset className="form-group">
								<legend>Qual o melhor turno? *</legend>
								<div className="radio-group">
									{SHIFTS.map(s => (
										<label key={s}>
											<input
												type="radio"
												name="shift"
												value={s}
												required
												checked={form.shift === s}
												onChange={() => update("shift", s)}
											/>{" "}
											{s}
										</label>
									))}
								</div>
							</fieldset>

							<fieldset className="form-group">
								<legend>Suporte da Liderança *</legend>
								<div className="radio-group radio-group-column">
									{SUPPORT_OPTIONS.map(opt => (
										<label key={opt.value}>
											<input
												type="radio"
												name="support"
												value={opt.value}
												required
												checked={form.support === opt.value}
												onChange={() => update("support", opt.value)}
											/>{" "}
											{opt.label}
										</label>
									))}
								</div>
							</fieldset>

							<button type="submit" className="btn-submit mt-8" disabled={submitting}>
								{submitting ? "Enviando proposta..." : "Enviar Proposta de Aula"}
							</button>
						</form>
					</>
				)}

				{!successMessage && feedback && (
					<Feedback message={feedback.message} type={feedback.type} />
				)}
			</div>
		</Modal>
	)
}
