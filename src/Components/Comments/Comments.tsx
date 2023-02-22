import {
	Dispatch,
	FormEvent,
	SetStateAction,
	useCallback,
	useState
} from 'react'
import { useShowTextarea, useUpdateComment, useUpdateScore } from '../../Hooks'

import { CommentsType } from '../../Types/Types'
import { NewComment } from '../NewComment'

type CommentsProps = CommentsType & {
	index: number
	onUpdate: Dispatch<SetStateAction<boolean>>
}

export const Comments = ({
	content,
	createdAt,
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
	const {
		showTextarea,
		showTextareaUpdate,
		onShowTextarea,
		onShowTextareaUpdate
	} = useShowTextarea()

	const [updateCommentInput, setUpdateCommentInput] = useState(content)

	const onUpdateComment = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			onShowTextareaUpdate()
			updateComment({ id, level, updatedProp: { content: updateCommentInput } })
			onUpdate((prevState) => !prevState)
		},
		[showTextareaUpdate, updateCommentInput]
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
				{showTextareaUpdate ? (
					<form id="updateComment" onSubmit={onUpdateComment}>
						<textarea
							autoFocus
							style={{ width: '100%', height: '100px' }}
							value={updateCommentInput}
							onChange={({ target }) => setUpdateCommentInput(target.value)}
						/>
						<button id="updateComment" type="submit">
							Update comment
						</button>
					</form>
				) : (
					<p>{content}</p>
				)}
			</div>

			<div>
				<button onClick={onShowTextarea}>Reply</button>
			</div>

			<div>
				<button onClick={onShowTextareaUpdate}>Update</button>
			</div>

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

			{showTextarea && (
				<NewComment
					index={index}
					level={1}
					replyingTo={username}
					onUpdate={onUpdate}
					onShowTextarea={onShowTextarea}
				/>
			)}

			<>
				{hasReplies &&
					replies?.map((reply) => (
						<Comments
							key={reply.id}
							index={index}
							onUpdate={onUpdate}
							{...reply}
						/>
					))}
			</>
		</div>
	)
}
