import { useState, type FormEvent } from "react"
import { CONFIG } from "../../config"
import { useLoading } from "../../context/LoadingContext"
import { useModal } from "../../context/ModalContext"
import { ApiService } from "../../services/api"
import type { ApiResponse, FeedbackType, WaitlistFormData } from "../../types"
import { maskPhone } from "../../utils/phoneMask"
import { Feedback } from "../Form/Feedback"
import { Modal } from "../Modal/Modal"

const AREAS = [
	"Front-end",
	"Back-end",
	"Mobile",
	"Dados",
	"IA",
	"DevOps",
	"Cloud",
	"Gamedev",
	"UI/UX",
	"Outras",
]
const LEVELS = ["Iniciante", "Júnior", "Pleno", "Sênior"]

export function WaitlistModal() {
	const { waitlistOpen, closeWaitlist } = useModal()
	const { show: showLoading, hide: hideLoading } = useLoading()

	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
	const [level, setLevel] = useState("")
	const [areas, setAreas] = useState<string[]>([])
	const [technologies, setTechnologies] = useState("")
	const [feedback, setFeedback] = useState<{
		message: string
		type: FeedbackType
	} | null>(null)
	const [submitting, setSubmitting] = useState(false)
	const [successMessage, setSuccessMessage] = useState<string | null>(null)

	const reset = () => {
		setName("")
		setPhone("")
		setLevel("")
		setAreas([])
		setTechnologies("")
		setFeedback(null)
		setSubmitting(false)
		setSuccessMessage(null)
	}

	const handleClose = () => {
		closeWaitlist()
		setTimeout(reset, 300)
	}

	const toggleArea = (value: string) => {
		setAreas(prev => (prev.includes(value) ? prev.filter(a => a !== value) : [...prev, value]))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if (!level || areas.length === 0) {
			setFeedback({ message: "Campos obrigatórios!", type: "error" })
			return
		}

		const payload: WaitlistFormData = {
			name,
			phone,
			level,
			areas,
			technologies,
		}
		setSubmitting(true)
		setFeedback(null)
		showLoading()

		try {
			const res = await ApiService.postData<ApiResponse>(CONFIG.ENDPOINTS.WAITLIST, payload)
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
		<Modal open={waitlistOpen} onClose={handleClose}>
			<div className="w-full">
				<h2 className="section-title">Lista de Espera</h2>

				{successMessage ? (
					<div className="text-center py-4">
						<h3 className="text-primary mb-4">Tudo certo!</h3>
						<p className="text-text-muted mb-4">{successMessage}</p>
						<button className="btn-success-close" onClick={handleClose}>
							Entendido
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="name">Qual é o seu nome? *</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								placeholder="Seu nome completo"
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="phone">Telefone (com DDD) *</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								required
								placeholder="(00) 00000-0000"
								value={phone}
								onChange={e => setPhone(maskPhone(e.target.value))}
							/>
						</div>
						<fieldset className="form-group">
							<legend>Qual é o seu nível? *</legend>
							<div className="radio-group">
								{LEVELS.map(lvl => (
									<label key={lvl}>
										<input
											type="radio"
											name="level"
											value={lvl}
											required
											checked={level === lvl}
											onChange={() => setLevel(lvl)}
										/>{" "}
										{lvl}
									</label>
								))}
							</div>
						</fieldset>
						<fieldset className="form-group">
							<legend>Áreas de interesse *</legend>
							<div className="checkbox-grid">
								{AREAS.map(area => (
									<label key={area}>
										<input
											type="checkbox"
											name="areas"
											value={area}
											checked={areas.includes(area)}
											onChange={() => toggleArea(area)}
										/>{" "}
										{area === "Outras" ? "Outra" : area}
									</label>
								))}
							</div>
						</fieldset>
						<div className="form-group">
							<label htmlFor="technologies">Tecnologias e linguagens que utiliza *</label>
							<textarea
								id="technologies"
								name="technologies"
								required
								placeholder="Exemplo: React, Angular, Java, Python..."
								value={technologies}
								onChange={e => setTechnologies(e.target.value)}
							/>
						</div>
						<button type="submit" className="btn-submit" disabled={submitting}>
							{submitting ? "Enviando..." : "Quero entrar na lista"}
						</button>
					</form>
				)}

				{!successMessage && feedback && (
					<Feedback message={feedback.message} type={feedback.type} />
				)}
			</div>
		</Modal>
	)
}
