import {
	Dispatch,
	FormEvent,
	SetStateAction,
	useCallback,
	useMemo
} from 'react'

import { CommentsData } from '../Types'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidv4 } from 'uuid'

type UseHandleSubmitProps = {
	index?: number
	level: number
	replyingTo?: string
	onHide?: () => void
	onUpdate: Dispatch<SetStateAction<boolean>>
}

type UseHandleSubmitReturn = {
	onSubmit: (
		comment: string,
		event: FormEvent<HTMLFormElement>,
		handleComment?: Dispatch<SetStateAction<string>>
	) => void
}

export function useHandleSubmit({
	index,
	level,
	replyingTo,
	onHide,
	onUpdate
}: UseHandleSubmitProps): UseHandleSubmitReturn {
	const { getLocalStorageValues, setLocalStorageValues } = useLocalStorage()

	const baseComment = useCallback((comment: string) => {
		return {
			level,
			id: uuidv4(),
			content: comment,
			createdAt: 'Today',
			...(replyingTo && { replyingTo }),
			replies: [],
			originalScore: 0,
			score: 0,
			user: {
				image: {
					png: './assets/images/avatars/image-juliusomo.png',
					webp: './assets/images/avatars/image-juliusomo.webp'
				},
				username: 'juliusomo'
			}
		}
	}, [])

	const onSubmit = useCallback(
		(
			comment: string,
			event: FormEvent<HTMLFormElement>,
			handleComment?: Dispatch<SetStateAction<string>>
		) => {
			event.preventDefault()

			const commensData = getLocalStorageValues<CommentsData>('commentsData')

			level && index !== undefined
				? commensData?.comments?.[index].replies?.push(baseComment(comment))
				: commensData?.comments?.push(baseComment(comment))

			setLocalStorageValues('commentsData', commensData)

			onHide?.()
			handleComment?.('')
			onUpdate((prevState) => !prevState)
		},
		[]
	)

	return { onSubmit }
}
