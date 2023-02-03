import { useCallback, useEffect } from 'react'

import { CommentsType } from '../../Types'
import { useHandleComments } from '../../Hooks'
import { useHandleSubmit } from '../../Hooks/useHandleSubmit'

type NewCommentProps = {
	id?: string
	level?: number
	replyingTo?: string
	replies?: CommentsType[]
}

export const NewComment = ({
	id,
	level = 0,
	replyingTo,
	replies
}: NewCommentProps) => {
	const { comment, handleComment } = useHandleComments(
		replyingTo ? `@${replyingTo} ` : ''
	)
	const { onSubmit } = useHandleSubmit({ level, replyingTo })
	console.log(id)

	return (
		<div
			style={{
				border: '1px solid yellow',
				padding: '1rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between'
			}}
		>
			<textarea
				onChange={({ target }) => handleComment(target.value)}
				value={comment}
			/>
			<p>{comment}</p>
			<button onClick={({ currentTarget }) => onSubmit(currentTarget.value)}>
				SEND
			</button>
		</div>
	)
}
