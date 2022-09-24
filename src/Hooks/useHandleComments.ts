import { useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { CommentsData, CommentsType } from '../Types/Types'

export const useHandleComments = (initialId: number) => {
	const {
		hasLocalStorageValues,
		getLocalStorageValues,
		setLocalStorageValues
	} = useLocalStorage()

	const [idCount, setIdCount] = useState(
		hasLocalStorageValues('idCount', initialId)
	)
	const [comments, setComments] = useState('')
	const commentsData: CommentsData | null =
		getLocalStorageValues('commentsData')

	function handleComments(inputValue: string) {
		setComments(inputValue)
	}

	function handleSubmit(
		isReply: boolean,
		index: number = 0,
		replyingTo?: string
	) {
		setIdCount(idCount + 1)

		const newComment: CommentsType = {
			id: idCount,
			content: comments,
			createdAt: 'Today',
			score: 0,
			...(isReply && { replyingTo }),
			user: {
				image: {
					png: './assets/images/avatars/image-juliusomo.png',
					webp: './assets/images/avatars/image-juliusomo.webp'
				},
				username: 'juliusomo'
			}
		}

		!isReply && commentsData
			? commentsData.comments.push(newComment)
			: commentsData?.comments?.[index]?.replies?.push(newComment)

		setLocalStorageValues('commentsData', commentsData)

		setComments('')
	}
	setLocalStorageValues('idCount', idCount)

	return { comments, idCount, handleComments, handleSubmit }
}

export default useHandleComments
