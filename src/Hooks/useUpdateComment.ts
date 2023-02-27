import { CommentsData, UpdatedProp } from '../Types'
import { useCallback, useEffect, useState } from 'react'

import { useLocalStorage } from './useLocalStorage'

type UpdateCommentProps = {
	id: string
	level: number
	updatedProp: UpdatedProp
}

type UseUpdateCommentReturn = {
	updateComment: ({ id, level, updatedProp }: UpdateCommentProps) => void
}

export function useUpdateComment(): UseUpdateCommentReturn {
	const { getLocalStorageValues, setLocalStorageValues } = useLocalStorage()
	const [updatedComments, setUpdatedComments] = useState<CommentsData>()

	const updateComment = useCallback(
		({ id, level, updatedProp }: UpdateCommentProps) => {
			const commentsData: CommentsData | null =
				getLocalStorageValues('commentsData')

			if (commentsData) {
				const { comments, currentUser } = commentsData

				if (!level) {
					const newComments = comments.map((comment) =>
						comment.id === id ? { ...comment, ...updatedProp } : comment
					)

					setUpdatedComments({ currentUser, comments: newComments })

					return
				}

				const newComments = comments.map((comment) => {
					const newReplies = comment.replies?.length
						? comment.replies?.map((reply) =>
								reply.id === id ? { ...reply, ...updatedProp } : reply
						  )
						: []

					return { ...comment, replies: newReplies }
				})

				setUpdatedComments({ currentUser, comments: newComments })
			}
		},
		[updatedComments]
	)

	useEffect(
		() =>
			updatedComments && setLocalStorageValues('commentsData', updatedComments),
		[updatedComments]
	)

	return { updateComment }
}
