import { useCallback, useEffect } from 'react'

import { CommentsType } from '../../Types'
import { useHandleComments } from '../../Hooks'
import { useHandleSubmit } from '../../Hooks/useHandleSubmit'

type NewCommentProps = {
	index?: number
	level?: number
	replyingTo?: string
	replies?: CommentsType[]
}

export const NewComment = ({
	index,
	level = 0,
	replyingTo,
	replies
}: NewCommentProps) => {
	const { comment, handleComment } = useHandleComments(
		replyingTo ? `@${replyingTo} ` : ''
	)
	const { onSubmit } = useHandleSubmit({ index, comment, level, replyingTo })
	console.log(index)

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
			<form onSubmit={onSubmit}>
				<textarea
					onChange={({ target }) => handleComment(target.value)}
					value={comment}
				/>
				<p>{comment}</p>
				<button type="submit">SEND</button>
			</form>
		</div>
	)
}
