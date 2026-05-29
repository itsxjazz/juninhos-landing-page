import type { FeedbackType } from "../../types"

interface FeedbackProps {
	message: string | null
	type: FeedbackType
}

export function Feedback({ message, type }: FeedbackProps) {
	if (!message) return null
	return <div className={`form-feedback ${type}`}>{message}</div>
}
