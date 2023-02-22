import { useState } from 'react'

type UseShowTextareaReturn = {
	showTextarea: boolean
	showTextareaUpdate: boolean
	onShowTextarea: () => void
	onShowTextareaUpdate: () => void
}

export function useShowTextarea(): UseShowTextareaReturn {
	const [showTextarea, setShowTextarea] = useState(false)
	const [showTextareaUpdate, setShowTextareaUpdate] = useState(false)

	function onShowTextarea() {
		setShowTextarea(!showTextarea)
	}

	function onShowTextareaUpdate() {
		setShowTextareaUpdate(!showTextareaUpdate)
	}

	return {
		showTextarea,
		showTextareaUpdate,
		onShowTextarea,
		onShowTextareaUpdate
	}
}
