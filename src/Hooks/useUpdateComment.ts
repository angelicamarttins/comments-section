import { CommentsData, CommentsType } from '../Types'
import { useCallback, useState } from 'react'

import { useLocalStorage } from './useLocalStorage'

type UpdateCommentProps = {
	id?: string
	index: number
	level: number
	updatedProp: string | number // Transformar em objeto só para destruturar sem precisar saber se é comment ou score
}

type PrepareCommentsData = UpdateCommentProps & {
	comments: CommentsType[]
	parentComment?: CommentsType
}

type UseUpdateCommentReturn = {
	updateComment: ({ updatedProp, id }: UpdateCommentProps) => void
}

export function useUpdateComment(): UseUpdateCommentReturn {
	const { getLocalStorageValues } = useLocalStorage()
	const newComments: CommentsType[] = []

	function prepareComments({
		id,
		level,
		comments,
		updatedProp
	}: PrepareCommentsData) {
		if (!level) {
			const a = comments.map((comment) =>
				comment.id === id ? { ...comment, content: 'a' } : comment
			)

			newComments.push(...a)
		}

		if (level) {
			const a = comments.map((comment) => {
				const b = comment.replies?.length
					? comment.replies?.map((reply) =>
							reply.id === id ? { ...reply, content: 'b' } : reply
					  )
					: []

				return { ...comment, replies: b }
			})
			newComments.push(...a)
		}

		return newComments
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
			}
		},
		[]
	)

	return { updateComment }
}
7
