import { useEffect, useState } from 'react'
import useHandleComments from '../../Hooks/useHandleComments'
import { useNewReply } from '../../Hooks/useNewReply'

import { CommentsType } from '../../Types/Types'
import { NewComment } from '../NewComment/NewComment'
import { Replies } from '../Replies/Replies'

export const Comments = ({
	content,
	createdAt,
	id,
	index,
	replies,
	score,
	user
}: CommentsType) => {
	const { image, username } = user
	const { png, webp } = image
	const { comments, handleComments, handleSubmit } = useHandleComments(5)
	const { shouldShowTextarea, showTextarea } = useNewReply()

	return (
		<div style={{ border: '1px solid red', marginBottom: '.5rem' }}>
			<>
				<img src={webp} alt={`${username} photo`} />
				<p>id: {id}</p>
				<p>Created at: {createdAt}</p>
				<p>{content}</p>
				<p>score: {score}</p>
				<p>{username}</p>
				{index && <p>{index}</p>}
			</>
			<div>
				<button onClick={shouldShowTextarea}>Reply</button>
			</div>
			{showTextarea && (
				<NewComment index={index} isReply replyingTo={username} />
			)}
			<>
				{replies &&
					replies.map((reply, index) => (
						<Replies index={index} key={reply.id} {...reply} />
					))}
			</>
		</div>
	)
}
