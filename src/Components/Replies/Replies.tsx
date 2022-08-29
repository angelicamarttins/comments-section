import { useNewReply } from '../../Hooks/useNewReply'
import { CommentsType } from '../../Types/Types'
import { NewComment } from '../NewComment/NewComment'

export const Replies = ({
	content,
	createdAt,
	id,
  index,
	replies,
	replyingTo,
	score,
	user
}: CommentsType) => {
	const { image, username } = user
	const { png, webp } = image
	const { shouldShowTextarea, showTextarea } = useNewReply()

	return (
		<div
			style={{ border: '1px solid green', margin: '.5rem', marginLeft: '2rem' }}
		>
			<>
				<img src={webp} alt={`${username} photo`} />
				<p>replyingTo: {replyingTo}</p>
				<p>id: {id}</p>
				<p>Created at: {createdAt}</p>
				<p>{content}</p>
				<p>score: {score}</p>
				<p>username: {username}</p>
        {index && <p>{index}</p>}
			</>
			<div>
				<button onClick={shouldShowTextarea}>Reply</button>
			</div>
			{showTextarea && <NewComment index={index} isReply replyingTo={username} />}
		</div>
	)
}
