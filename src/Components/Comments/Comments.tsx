import { CommentsType } from '../../Types/Types'
import { NewComment } from '../NewComment'
import { useNewReply } from '../../Hooks'

export const Comments = ({
	content,
	createdAt,
	id,
	level,
	replies,
	score,
	user,
	update
}: CommentsType) => {
	const { image, username } = user
	const { png, webp } = image
	const { shouldShowTextarea, showTextarea } = useNewReply()

	const hasReplies = replies && replies?.length > 0

	const commentStyle = { border: '1px solid red', margin: `.5rem ${level}rem` }

	return (
		<div style={commentStyle}>
			<>
				<img src={webp} alt={`${username} photo`} />
				<p>id: {id}</p>
				<p>Created at: {createdAt}</p>
				<p>{content}</p>
				<p>score: {score}</p>
				<p>{username}</p>
			</>
			<div>
				<button onClick={shouldShowTextarea}>Reply</button>
			</div>
			{showTextarea && (
				<NewComment id={id} level={1} replyingTo={username} replies={replies} />
			)}
			<>
				{hasReplies &&
					replies?.map((reply) => <Comments key={reply.id} {...reply} />)}
			</>
		</div>
	)
}
