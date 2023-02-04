import { FormEvent, useCallback, useMemo } from 'react'

import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidv4 } from 'uuid'

type UseHandleSubmitProps = {
	comment: string
	level: number
	replyingTo?: string
}

type UseHandleSubmitReturn = {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function useHandleSubmit({
	comment,
	level,
	replyingTo
}: UseHandleSubmitProps): UseHandleSubmitReturn {
	const {
		hasLocalStorageValues,
		getLocalStorageValues,
		setLocalStorageValues
	} = useLocalStorage()

	const baseComment = useMemo(() => {
		return {
			level,
			id: uuidv4(),
			content: comment,
			createdAt: 'Today',
			score: 0,
			...(replyingTo && { replyingTo }),
			user: {
				image: {
					png: './assets/images/avatars/image-juliusomo.png',
					webp: './assets/images/avatars/image-juliusomo.webp'
				},
				username: 'juliusomo'
			}
		}
	}, [comment])

	const onSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			// hasLocalStorageValues('test') || getLocalStorageValues('commentsData')
		},
		[comment]
	)

	return { onSubmit }
}
