import { useState } from 'react'

type UseShowTextareaReturn = {
	showTextarea: boolean
	onShowTextarea: () => void
}

export function useShowTextarea(): UseShowTextareaReturn {
	const [showTextarea, setShowTextarea] = useState(false)

	function onShowTextarea() {
		setShowTextarea(!showTextarea)
	}

	return { showTextarea, onShowTextarea }
}
