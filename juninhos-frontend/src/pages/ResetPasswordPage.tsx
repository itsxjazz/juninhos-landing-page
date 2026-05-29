import { useState, type FormEvent } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { CONFIG } from "../config"
import { useAuth, type AuthUser } from "../context/AuthContext"
import { ApiService } from "../services/api"
import type { FeedbackType } from "../types"

interface ResetResponse {
	message: string
	token: string
	user: AuthUser
}

export function ResetPasswordPage() {
	const [params] = useSearchParams()
	const token = params.get("token")
	const [feedback, setFeedback] = useState<{
		msg: string
		type: FeedbackType
	} | null>(null)
	const [submitting, setSubmitting] = useState(false)
	const { login } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!token) {
			return setFeedback({
				msg: "Token de redefinição ausente na URL.",
				type: "error",
			})
		}

		const form = new FormData(e.currentTarget)
		const password = String(form.get("password") ?? "")
		const confirm = String(form.get("confirm") ?? "")

		if (password.length < 6) {
			return setFeedback({
				msg: "Senha deve ter no mínimo 6 caracteres.",
				type: "error",
			})
		}
		if (password !== confirm) {
			return setFeedback({ msg: "As senhas não coincidem.", type: "error" })
		}

		setSubmitting(true)
		setFeedback(null)
		try {
			const res = await ApiService.postAuth<ResetResponse>(
				`${CONFIG.ENDPOINTS.RESET_PASSWORD}/${token}`,
				{ password },
			)
			login(res.token, res.user)
			setFeedback({
				msg: "Senha redefinida com sucesso. Redirecionando…",
				type: "success",
			})
			setTimeout(() => navigate("/portal", { replace: true }), 1000)
		} catch (err) {
			setFeedback({
				msg: err instanceof Error ? err.message : "Erro",
				type: "error",
			})
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<main className="container py-32 min-h-screen flex flex-col items-center">
			<header className="section-header-left text-center mx-auto max-w-[500px] !text-center">
				<span className="section-eyebrow">// REDEFINIR SENHA</span>
				<h1 className="section-title">Nova Senha</h1>
				<p className="section-subtitle !text-center">Digite a nova senha abaixo.</p>
			</header>

			<form
				onSubmit={handleSubmit}
				className="card-item !p-7 flex flex-col gap-4 w-full max-w-[460px]"
			>
				<div className="form-group !mb-0">
					<label htmlFor="new-password">Nova senha</label>
					<input
						type="password"
						id="new-password"
						name="password"
						required
						placeholder="Min 6 caracteres"
					/>
				</div>
				<div className="form-group !mb-0">
					<label htmlFor="confirm-password">Confirmar nova senha</label>
					<input
						type="password"
						id="confirm-password"
						name="confirm"
						required
						placeholder="Repita a senha"
					/>
				</div>
				<button type="submit" className="btn-submit" disabled={submitting || !token}>
					{submitting ? "Salvando…" : "Salvar nova senha"}
				</button>
				{!token && (
					<p className="text-error text-sm">Token de redefinição não encontrado na URL.</p>
				)}
			</form>

			{feedback && (
				<div className={`form-feedback ${feedback.type} mt-4 max-w-[460px] w-full`}>
					{feedback.msg}
				</div>
			)}

			<p className="text-center text-text-muted text-sm mt-6">
				<Link to="/login" className="hover:text-primary transition-colors">
					← Voltar ao login
				</Link>
			</p>
		</main>
	)
}
