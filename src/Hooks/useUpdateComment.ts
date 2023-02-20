import { CommentsData, CommentsType, UpdatedProp } from '../Types'
import { useCallback, useEffect, useState } from 'react'

import { useLocalStorage } from './useLocalStorage'

type UpdateCommentProps = {
	id?: string
	index: number
	level: number
	updatedProp: UpdatedProp
}

type PrepareCommentsData = UpdateCommentProps & {
	comments: CommentsType[]
	parentComment?: CommentsType
}

type UseUpdateCommentReturn = {
	updateComment: ({ id, index, level, updatedProp }: UpdateCommentProps) => void
}

export function useUpdateComment(): UseUpdateCommentReturn {
	const { getLocalStorageValues } = useLocalStorage()
	const [updatedComments, setUpdatedComments] = useState<CommentsType[]>([])

	function prepareComments({
		id,
		level,
		comments,
		updatedProp
	}: PrepareCommentsData) {
		if (!level) {
			const newComments = comments.map((comment) =>
				comment.id === id ? { ...comment, ...updatedProp } : comment
			)

			setUpdatedComments([...newComments])
		}

		if (level) {
			const newComments = comments.map((comment) => {
				const newReplies = comment.replies?.length
					? comment.replies?.map((reply) =>
							reply.id === id ? { ...reply, ...updatedProp } : reply
					  )
					: []

				return { ...comment, replies: newReplies }
			})

			setUpdatedComments([...newComments])
		}
		return updatedComments
	}

	const updateComment = useCallback(
		({ id, index, level, updatedProp }: UpdateCommentProps) => {
			const commentsData: CommentsData | null =
				getLocalStorageValues('commentsData')

			if (commentsData) {
				const { comments, currentUser } = commentsData

				const res = {
					currentUser,
					comments: prepareComments({
						comments,
						id,
						index,
						level,
						updatedProp
					})
				}
				console.log(res)
			}
		},
		[updatedComments]
	)

	useEffect(() => {
		console.log(updatedComments)
	}, [updatedComments])
	// Na função updateComments, é melhor enviar o commentsData completo para retorná-lo e aqui dentro do effect chamar o setLocalStorage.it
	return { updateComment }
}
