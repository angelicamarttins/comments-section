import { FormEvent, useCallback } from 'react'
import { useFlag, useUpdateComment, useUpdateScore } from '../../../Hooks'
import { useDeleteComment } from '../../../Hooks/useDeleteComment'
import { CommentsType } from '../../../Types'

type UseCommentsProps = {
	id: string
	level: number
	originalScore: number
	replies?: CommentsType[]
	score: number
	onUpdate: () => void
}

type UseCommentsReturn = {
	didUserDecrementVote: boolean
	didUserIncrementVote: boolean
	hasReplies?: boolean
	showDeleteModal: boolean
	showNewReply: boolean
	showUpdateComment: boolean
	updatedScore: number
	deleteComment: () => void
	onDecrementScore: () => void
	onIncrementScore: () => void
	onHideDeleteModal: () => void
	onHideNewReply: () => void
	onShowDeleteModal: () => void
	onShowNewReply: () => void
	onShowUpdateComment: () => void
	onUpdateComment: (comment: string, event: FormEvent<HTMLFormElement>) => void
}

export function useComments({
	id,
	level,
	originalScore,
	replies,
	score,
	onUpdate
}: UseCommentsProps): UseCommentsReturn {
	const {
		didUserDecrementVote,
		didUserIncrementVote,
		updatedScore,
		onDecrementScore,
		onIncrementScore
	} = useUpdateScore({
		id,
		level,
		originalScore,
		score
	})

	const [showNewReply, onShowNewReply, onHideNewReply] = useFlag()
	const [showUpdateComment, onShowUpdateComment, onHideUpdateComment] =
		useFlag()
	const [showDeleteModal, onShowDeleteModal, onHideDeleteModal] = useFlag()

	const { deleteComment } = useDeleteComment({
		id,
		level,
		onHide: onHideDeleteModal,
		onUpdate
	})

	const { updateComment } = useUpdateComment()

	const onUpdateComment = useCallback(
		(comment: string, event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			updateComment({
				id,
				level,
				updatedProp: { content: comment }
			})

			onHideUpdateComment()
			onUpdate()
		},
		[showUpdateComment]
	)

	console.log('hook', replies, !!replies)

	const hasReplies = replies && replies?.length > 0

	return {
		didUserDecrementVote,
		didUserIncrementVote,
		hasReplies,
		showDeleteModal,
		showNewReply,
		showUpdateComment,
		updatedScore,
		deleteComment,
		onDecrementScore,
		onIncrementScore,
		onHideDeleteModal,
		onHideNewReply,
		onShowDeleteModal,
		onShowNewReply,
		onShowUpdateComment,
		onUpdateComment
	}
}
