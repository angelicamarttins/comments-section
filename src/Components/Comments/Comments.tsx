import {
	CommentLine,
	Image,
	InfoLine,
	InfoWrapper,
	ScoreButton,
	ScoreCount,
	ScoreWrapper,
	UserName,
	CommentWrapper,
	ReplyWrapper,
	ReplyBar,
	MultiButton,
	Chip
} from './Comments.styles'
import { CommentsType, UserType } from '../../Types/Types'

import {
	DeleteIcon,
	EditIcon,
	MinusIcon,
	PlusIcon,
	ReplyIcon
} from '../../assets/icons'
import { Modal } from '../Modal'
import { NewComment } from '../NewComment'
import { TextArea } from '../TextArea/TextArea'
import { useComments } from './hooks/useComments'
import { IconedButton } from '../IconedButton'
import { formatDistanceToNowStrict } from 'date-fns'

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
	const { webp } = image

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
	} = useComments({
		id,
		level,
		originalScore,
		replies,
		score,
		onUpdate
	})

	const isUser = username === currentUser.username

	return (
		<>
			<CommentWrapper>
				<ScoreWrapper>
					<ScoreButton
						disabled={didUserIncrementVote}
						onClick={onIncrementScore}
					>
						<PlusIcon />
					</ScoreButton>

					<ScoreCount>{updatedScore}</ScoreCount>

					<ScoreButton
						disabled={didUserDecrementVote}
						onClick={onDecrementScore}
					>
						<MinusIcon />
					</ScoreButton>
				</ScoreWrapper>

				<InfoLine>
					<InfoWrapper>
						<Image src={webp} alt={`${username} photo`} />
						<UserName>{username}</UserName>
						{isUser && <Chip>you</Chip>}
						<p>
							{formatDistanceToNowStrict(new Date(createdAt), {
								addSuffix: true,
								roundingMethod: 'ceil'
							})}
						</p>
					</InfoWrapper>

					{!isUser && (
						<IconedButton icon={<ReplyIcon />} onClick={onShowNewReply}>
							Reply
						</IconedButton>
					)}

					{isUser && (
						<>
							<MultiButton>
								<IconedButton
									icon={<DeleteIcon />}
									textColor="red"
									textHover="redSoft"
									onClick={onShowDeleteModal}
								>
									Delete
								</IconedButton>

								<IconedButton onClick={onShowUpdateComment} icon={<EditIcon />}>
									Edit
								</IconedButton>
							</MultiButton>
						</>
					)}
				</InfoLine>

				<CommentLine>
					{showUpdateComment ? (
						<TextArea
							buttonTitle="Update"
							initialValue={content}
							onSubmit={onUpdateComment}
						/>
					) : (
						<p>{content}</p>
					)}
				</CommentLine>

				{showNewReply && (
					<NewComment
						index={index}
						level={1}
						replyingTo={username}
						onUpdate={onUpdate}
						onHide={onHideNewReply}
					/>
				)}

				<Modal
					message="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
					primaryAction={deleteComment}
					primaryLabel="Yes, delete"
					title="Delete comment"
					secondaryAction={onHideDeleteModal}
					secondaryLabel="No, cancel"
					show={showDeleteModal}
				/>
			</CommentWrapper>

			{hasReplies && (
				<ReplyWrapper>
					<ReplyBar />
					<div>
						{replies?.map((reply) => (
							<Comments
								key={reply.id}
								index={index}
								onUpdate={onUpdate}
								currentUser={currentUser}
								{...reply}
							/>
						))}
					</div>
				</ReplyWrapper>
			)}
		</>
	)
}
