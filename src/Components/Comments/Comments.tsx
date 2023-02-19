import { Dispatch, SetStateAction } from 'react'
import { useShowTextarea, useUpdateScore } from '../../Hooks'

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
		index,
		level,
		score
	})

	const { showTextarea, onShowTextarea } = useShowTextarea()

	const hasReplies = replies && replies?.length > 0

	const commentStyle = { border: '1px solid red', margin: `.5rem ${level}rem` }

	return (
		<div style={commentStyle}>
			<>
				<img src={webp} alt={`${username} photo`} />
				<p>id: {id}</p>
				<p>Created at: {createdAt}</p>
				<p>{content}</p>
				<p>{username}</p>
			</>
			<div>
				<button onClick={onShowTextarea}>Reply</button>
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
