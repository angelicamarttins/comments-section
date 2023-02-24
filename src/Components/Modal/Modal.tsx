type ModalProps = {
	message: string
	title: string
	primaryLabel: string
	secondaryLabel: string
	show: boolean
	primaryAction: () => void
	secondaryAction: () => void
}

export const Modal = ({
	message,
	title,
	primaryLabel,
	secondaryLabel,
	show,
	primaryAction,
	secondaryAction
}: ModalProps) => {
	return (
		<>
			{show && (
				<>
					<h1>{title}</h1>
					<p>{message}</p>
					<button onClick={primaryAction}>{primaryLabel}</button>
					<button onClick={secondaryAction}>{secondaryLabel}</button>
				</>
			)}
		</>
	)
}
