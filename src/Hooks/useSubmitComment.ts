import { Dispatch, FormEvent, SetStateAction, useCallback } from 'react'

import { CommentsData } from '../Types'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidv4 } from 'uuid'

type UseSubmitCommentProps = {
	index?: number
	level: number
	replyingTo?: string
	onHide?: () => void
	onUpdate: () => void
}

type UseSubmitCommentReturn = {
	submitComment: (
		comment: string,
		event: FormEvent<HTMLFormElement>,
		handleComment?: Dispatch<SetStateAction<string>>
	) => void
}

export function useSubmitComment({
	index,
	level,
	replyingTo,
	onHide,
	onUpdate
}: UseSubmitCommentProps): UseSubmitCommentReturn {
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
					png: './src/assets/images/avatars/image-juliusomo.png',
					webp: './src/assets/images/avatars/image-juliusomo.webp'
				},
				username: 'juliusomo'
			}
		}
	}, [])

	const submitComment = useCallback(
		(
			comment: string,
			event: FormEvent<HTMLFormElement>,
			handleComment?: Dispatch<SetStateAction<string>>
		) => {
			event.preventDefault()

			const commentsData = getLocalStorageValues<CommentsData>('commentsData')

			!!level && index !== undefined
				? commentsData?.comments?.[index].replies?.push(baseComment(comment))
				: commentsData?.comments.push(baseComment(comment))

			setLocalStorageValues('commentsData', commentsData)

			onHide?.()
			handleComment?.('')
			onUpdate()
		},
		[]
	)

	return { submitComment }
}
