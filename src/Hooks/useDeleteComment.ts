import { useCallback, useEffect, useState } from 'react'

import { CommentsData } from '../Types'
import { useLocalStorage } from './useLocalStorage'

type UseDeleteCommentProps = {
	id: string
	level: number
	onHide: () => void
	onUpdate: () => void
}

type UseDeleteCommentReturn = {
	deleteComment: () => void
}

export function useDeleteComment({
	id,
	level,
	onHide,
	onUpdate
}: UseDeleteCommentProps): UseDeleteCommentReturn {
	const { getLocalStorageValues, setLocalStorageValues } = useLocalStorage()
	const [newCommentsData, setNewCommentsData] = useState<CommentsData>()

	const deleteComment = useCallback(() => {
		const commentsData = getLocalStorageValues<CommentsData>('commentsData')

		if (commentsData) {
			const { comments, currentUser } = commentsData

			if (!level) {
				const newComments = comments.filter((comment) => comment.id !== id)

				setNewCommentsData({ currentUser, comments: newComments })

				onHide()
				onUpdate()

				return
			}

			const newComments = comments.map((comment) => {
				const newReplies = comment.replies?.length
					? comment.replies?.filter((reply) => reply.id !== id)
					: []

				return { ...comment, replies: newReplies }
			})

			setNewCommentsData({ currentUser, comments: newComments })

			onHide()
			onUpdate()
		}
	}, [newCommentsData])

	useEffect(
		() =>
			newCommentsData && setLocalStorageValues('commentsData', newCommentsData),
		[newCommentsData]
	)

	return { deleteComment }
}
