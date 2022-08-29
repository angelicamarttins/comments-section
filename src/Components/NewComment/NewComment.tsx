import { useEffect } from 'react'
import useHandleComments from '../../Hooks/useHandleComments'

type NewCommentProps = {
	index?: number
	isReply?: boolean
	replyingTo?: string
}

export const NewComment = ({ index, isReply, replyingTo }: NewCommentProps) => {
	const { comments, handleComments, handleSubmit } = useHandleComments()

	useEffect(() => {
		if (isReply) handleComments(`@${replyingTo}`)
	}, [])

	return (
		<div
			style={{
				border: '1px solid red',
				padding: '1rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between'
			}}
		>
			<textarea
				onChange={({ target }) => handleComments(target.value)}
				value={comments}
			/>
			<p>{comments}</p>
			{index && <p>{index}</p>}
			<button onClick={() => handleSubmit(index, true, 'angelica')}>
				SEND
			</button>
		</div>
	)
}
