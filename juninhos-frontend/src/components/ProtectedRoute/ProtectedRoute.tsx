import { Navigate, useLocation } from "react-router-dom"
import type { ReactNode } from "react"
import { useAuth } from "../../context/AuthContext"

export function ProtectedRoute({ children }: { children: ReactNode }) {
	const { isAuthenticated } = useAuth()
	const location = useLocation()

	if (!isAuthenticated) {
		return <Navigate to="/login" replace state={{ from: location }} />
	}
	return <>{children}</>
}
