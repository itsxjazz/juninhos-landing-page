import { useModal } from "../../context/ModalContext"
import { Modal } from "../Modal/Modal"

export function ProjectDetailsModal() {
	const { projectDetail, closeProjectDetail } = useModal()
	const open = projectDetail !== null

	return (
		<Modal open={open} onClose={closeProjectDetail} maxWidth="600px">
			<div>
				<h2 className="section-title">{projectDetail?.title ?? ""}</h2>
				<div
					className="mt-6 leading-relaxed text-text-muted"
					dangerouslySetInnerHTML={{ __html: projectDetail?.body ?? "" }}
				/>
			</div>
		</Modal>
	)
}
