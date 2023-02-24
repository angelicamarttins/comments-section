import { CommentsType, UserType } from '../../Types/Types'
import {
	Dispatch,
	FormEvent,
	SetStateAction,
	useCallback,
	useState
} from 'react'
import { useFlag, useUpdateComment, useUpdateScore } from '../../Hooks'

import { Modal } from '../Modal'
import { NewComment } from '../NewComment'
import { TextArea } from '../TextArea/TextArea'

type CommentsProps = CommentsType & {
	currentUser: UserType
	index: number
	onUpdate: Dispatch<SetStateAction<boolean>>
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

	const { updateComment } = useUpdateComment()
	const [showNewComment, onShowNewComment, onHideNewComment] = useFlag()
	const [showUpdateComment, onShowUpdateComment, onHideUpdateComment] =
		useFlag()
	const [showDeleteModal, onShowDeleteModal, onHideDeleteModal] = useFlag()

	const onUpdateComment = useCallback(
		(comment: string, event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			onHideUpdateComment()
			updateComment({ id, level, updatedProp: { content: comment } })
			onUpdate((prevState) => !prevState)
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

			<div>
				<button onClick={onShowNewComment}>Reply</button>
			</div>

			{username === currentUser?.username && (
				<>
					<div>
						<button onClick={onShowUpdateComment}>Update</button>
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

			{showNewComment && (
				<NewComment
					index={index}
					level={1}
					replyingTo={username}
					onUpdate={onUpdate}
					onHide={onHideNewComment}
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
				primaryAction={() => {
					console.log('deleted')
					onHideDeleteModal()
				}}
				primaryLabel="Yes, delete"
				title="Delete comment"
				secondaryAction={onHideDeleteModal}
				secondaryLabel="No, cancel"
				show={showDeleteModal}
			/>
		</div>
	)
}
