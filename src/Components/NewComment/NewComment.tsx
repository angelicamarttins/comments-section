import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'

import { CommentsType } from '../../Types'
import { TextArea } from '../TextArea/TextArea'
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
	const { onSubmit } = useHandleSubmit({
		index,
		level,
		replyingTo,
		onShowTextarea,
		onUpdate
	})

	return (
		<TextArea
			onSubmit={onSubmit}
			initialValue={replyingTo ? `@${replyingTo} ` : ''}
			buttonTitle="SEND"
		/>
	)
}
