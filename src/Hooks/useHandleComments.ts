import { useState } from 'react'

export const useHandleComments = () => {
	const [comments, setComments] = useState('')

	function handleComments(value: string) {
		setComments(value)
	}

	return { comments, handleComments }
}

export default useHandleComments
