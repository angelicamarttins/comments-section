import { useState } from 'react'

type UseNewReplyReturn = {
	showTextarea: boolean
	shouldShowTextarea: () => void
}

export function useNewReply(): UseNewReplyReturn {
	const [showTextarea, setShowTextarea] = useState(false)

	function shouldShowTextarea() {
		setShowTextarea(!showTextarea)
	}

	return { shouldShowTextarea, showTextarea }
}
