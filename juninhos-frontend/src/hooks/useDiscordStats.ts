import { useEffect, useState } from "react"

export interface DiscordStats {
	total: number | null
	online: number | null
	loading: boolean
}

interface InviteResponse {
	approximate_member_count?: number
	approximate_presence_count?: number
}

const REFRESH_INTERVAL_MS = 10 * 60 * 1000 // 10 min

export function useDiscordStats(inviteCode: string | undefined): DiscordStats {
	const [stats, setStats] = useState<DiscordStats>({
		total: null,
		online: null,
		loading: true,
	})

	useEffect(() => {
		if (!inviteCode) {
			setStats({ total: null, online: null, loading: false })
			return
		}

		let cancelled = false

		const load = async () => {
			try {
				const res = await fetch(
					`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`,
				)
				if (!res.ok) throw new Error(`Invite API failed (${res.status})`)
				const data = (await res.json()) as InviteResponse
				if (!cancelled) {
					setStats({
						total: data.approximate_member_count ?? null,
						online: data.approximate_presence_count ?? null,
						loading: false,
					})
				}
			} catch {
				if (!cancelled) {
					setStats({ total: null, online: null, loading: false })
				}
			}
		}

		load()
		const intervalId = window.setInterval(load, REFRESH_INTERVAL_MS)

		return () => {
			cancelled = true
			window.clearInterval(intervalId)
		}
	}, [inviteCode])

	return stats
}
