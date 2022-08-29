import { useState } from 'react'

export const useNewReply = () => {
	const [showTextarea, setShowTextarea] = useState(false)

	function shouldShowTextarea() {
		setShowTextarea(!showTextarea)
	}

	return { shouldShowTextarea, showTextarea }
}
