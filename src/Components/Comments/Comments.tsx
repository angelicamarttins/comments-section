import { CommentsType, UserType } from '../../Types/Types'

import { Modal } from '../Modal'
import { NewComment } from '../NewComment'
import { TextArea } from '../TextArea/TextArea'
import { useComments } from './hooks/useComments'

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
	} = useComments({ id, level, originalScore, replies, score, onUpdate })

	return (
		<div>
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
