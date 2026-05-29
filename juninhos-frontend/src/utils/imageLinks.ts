const FALLBACK_IMAGE =
	"https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400"

export function getDirectImageLink(url?: string): string | undefined {
	if (!url) return url

	if (url.includes("drive.google.com")) {
		const match = url.match(/\/d\/([^/]+)/)
		return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : url
	}

	if (url.includes("github.com") && url.includes("/blob/")) {
		return url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
	}

	return url
}

export function resolveProjectImage(rawImage?: string): string {
	const converted = getDirectImageLink(rawImage)
	const isImage =
		!!converted &&
		(!!converted.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i) ||
			converted.includes("drive.google.com") ||
			converted.includes("googleusercontent.com") ||
			converted.includes("images.unsplash.com") ||
			converted.startsWith("http"))

	return isImage ? converted! : FALLBACK_IMAGE
}

export { FALLBACK_IMAGE }
