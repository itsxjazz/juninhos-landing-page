import { useEffect, useState } from "react"
import { CONFIG } from "../config"
import { ApiService } from "../services/api"

export function useApiList<T>(endpoint: string): {
	data: T[] | null
	loaded: boolean
} {
	const [data, setData] = useState<T[] | null>(null)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		let cancelled = false
		let timeoutId: ReturnType<typeof setTimeout> | null = null

		const load = async () => {
			const result = await ApiService.fetchData<T[]>(endpoint)
			if (cancelled) return

			if (result && result.length > 0) {
				setData(result)
				setLoaded(true)
			} else {
				timeoutId = setTimeout(load, CONFIG.RETRY_DELAY)
			}
		}

		load()

		return () => {
			cancelled = true
			if (timeoutId) clearTimeout(timeoutId)
		}
	}, [endpoint])

	return { data, loaded }
}
