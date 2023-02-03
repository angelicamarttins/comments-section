import { useCallback } from 'react'

type UseHandleSubmitProps = {
	level: number
	replyingTo?: string
}

type UseHandleSubmitReturn = {
	onSubmit: (comment: string) => void
}

export const useHandleSubmit = ({
	level,
	replyingTo
}: UseHandleSubmitProps): UseHandleSubmitReturn => {
	const onSubmit = useCallback((comment: string) => {
		console.log(comment)
	}, [])

	return { onSubmit }
}
