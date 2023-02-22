import { Dispatch, SetStateAction } from 'react'

import { useHandleComments } from '../../Hooks'
import { useHandleSubmit } from '../../Hooks/useHandleSubmit'

type NewCommentProps = {
	index?: number
	level?: number
	replyingTo?: string
	onShowTextarea?: () => void
	onUpdate: Dispatch<SetStateAction<boolean>>
}

export const NewComment = ({
	index,
	level = 0,
	replyingTo,
	onShowTextarea,
	onUpdate
}: NewCommentProps) => {
	const { comment, handleComment } = useHandleComments(
		replyingTo ? `@${replyingTo} ` : ''
	)
	const { onSubmit } = useHandleSubmit({
		index,
		comment,
		level,
		replyingTo,
		handleComment,
		onShowTextarea,
		onUpdate
	})

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
			<form id="newComment" onSubmit={onSubmit}>
				<textarea
					autoFocus
					onChange={({ target }) => handleComment(target.value)}
					value={comment}
				/>
				<p>{comment}</p>
				<button id="newComment" type="submit">
					SEND
				</button>
			</form>
		</div>
	)
}
