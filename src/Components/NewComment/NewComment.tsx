import { TextArea } from '../TextArea/TextArea'
import { useSubmitComment } from '../../Hooks/useSubmitComment'

type NewCommentProps = {
	index?: number
	level?: number
	replyingTo?: string
	onHide?: () => void
	onUpdate: () => void
}

export const NewComment = ({
	index,
	level = 0,
	replyingTo,
	onHide,
	onUpdate
}: NewCommentProps) => {
	const { submitComment } = useSubmitComment({
		index,
		level,
		replyingTo,
		onHide,
		onUpdate
	})

	return (
		<TextArea
			onSubmit={submitComment}
			initialValue={replyingTo ? `@${replyingTo} ` : ''}
			buttonTitle="SEND"
		/>
	)
}
