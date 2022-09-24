import { useEffect } from 'react'
import useHandleComments from '../../Hooks/useHandleComments'

type NewCommentProps = {
	index?: number
	isReply?: boolean
	replyingTo?: string
	handleUpdate: () => void
}

export const NewComment = ({
	index,
	isReply,
	replyingTo,
	handleUpdate
}: NewCommentProps) => {
	const { comments, handleComments, handleSubmit } = useHandleComments(5)

	useEffect(() => {
		if (isReply && replyingTo) handleComments(`@${replyingTo}, `)
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
			<button onClick={() => handleSubmit(true, index, replyingTo)}>
				SEND
			</button>
			<button onClick={() => handleUpdate()}>TESTE</button>
		</div>
	)
}
