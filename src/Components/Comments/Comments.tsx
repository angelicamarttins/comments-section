import { CommentsType, UserType } from '../../Types/Types'
import { FormEvent, useCallback } from 'react'
import { useFlag, useUpdateComment, useUpdateScore } from '../../Hooks'

import { Modal } from '../Modal'
import { NewComment } from '../NewComment'
import { TextArea } from '../TextArea/TextArea'
import { useDeleteComment } from '../../Hooks/useDeleteComment'

type CommentsProps = CommentsType & {
	currentUser: UserType
	index: number
	onUpdate: () => void
}

export const Comments = ({
	content,
	createdAt,
	currentUser,
	id,
	index,
	level,
	originalScore,
	replies,
	score,
	user,
	onUpdate
}: CommentsProps) => {
	const { image, username } = user
	const { png, webp } = image
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

	const hasReplies = replies && replies?.length > 0

	const commentStyle = { border: '1px solid red', margin: `.5rem ${level}rem` }

	return (
		<div style={commentStyle}>
			<div>
				<img src={webp} alt={`${username} photo`} />
				<p>id: {id}</p>
				<p>Created at: {createdAt}</p>
				<p>{username}</p>
				{showUpdateComment ? (
					<TextArea
						buttonTitle="Update"
						initialValue={content}
						onSubmit={onUpdateComment}
					/>
				) : (
					<p>{content}</p>
				)}
			</div>

			{username !== currentUser.username && (
				<div>
					<button onClick={onShowNewReply}>Reply</button>
				</div>
			)}

			{username === currentUser.username && (
				<>
					<p>you</p>
					<div>
						<button onClick={onShowUpdateComment}>Edit</button>
					</div>
					<div>
						<button onClick={onShowDeleteModal}>Delete</button>
					</div>
				</>
			)}

			<div
				style={{
					margin: '10px 0',
					display: 'flex',
					alignContent: 'center'
				}}
			>
				<button disabled={didUserDecrementVote} onClick={onDecrementScore}>
					-
				</button>
				<p>{updatedScore}</p>
				<button disabled={didUserIncrementVote} onClick={onIncrementScore}>
					+
				</button>
			</div>

			{showNewReply && (
				<NewComment
					index={index}
					level={1}
					replyingTo={username}
					onUpdate={onUpdate}
					onHide={onHideNewReply}
				/>
			)}

			<>
				{hasReplies &&
					replies?.map((reply) => (
						<Comments
							key={reply.id}
							index={index}
							onUpdate={onUpdate}
							currentUser={currentUser}
							{...reply}
						/>
					))}
			</>

			<Modal
				message="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
				primaryAction={deleteComment}
				primaryLabel="Yes, delete"
				title="Delete comment"
				secondaryAction={onHideDeleteModal}
				secondaryLabel="No, cancel"
				show={showDeleteModal}
			/>
		</div>
	)
}
