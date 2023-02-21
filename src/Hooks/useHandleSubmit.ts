import {
	Dispatch,
	FormEvent,
	SetStateAction,
	useCallback,
	useMemo
} from 'react'

import { CommentsData } from '../Types'
import { useLocalStorage } from './useLocalStorage'
import { useUpdateComment } from './useUpdateComment'
import { v4 as uuidv4 } from 'uuid'

type UseHandleSubmitProps = {
	comment: string
	index?: number
	level: number
	replyingTo?: string
	handleComment: Dispatch<SetStateAction<string>>
	onShowTextarea?: () => void
	onUpdate: Dispatch<SetStateAction<boolean>>
}

type UseHandleSubmitReturn = {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function useHandleSubmit({
	index,
	comment,
	level,
	replyingTo,
	handleComment,
	onShowTextarea,
	onUpdate
}: UseHandleSubmitProps): UseHandleSubmitReturn {
	console.log('sb')
	const { getLocalStorageValues, setLocalStorageValues } = useLocalStorage()

	const baseComment = useMemo(() => {
		return {
			level,
			id: uuidv4(),
			content: comment,
			createdAt: 'Today',
			score: 0,
			...(replyingTo && { replyingTo }),
			replies: [],
			votes: [],
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

			const commensData = getLocalStorageValues<CommentsData>('commentsData')

			level && index !== undefined
				? commensData?.comments?.[index].replies?.push(baseComment)
				: commensData?.comments?.push(baseComment)

			setLocalStorageValues('commentsData', commensData)

			onShowTextarea?.()
			handleComment('')
			onUpdate((prevState) => !prevState)
		},
		[comment]
	)

	return { onSubmit }
}
