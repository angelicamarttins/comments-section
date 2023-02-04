import { Dispatch, SetStateAction, useState } from 'react'

type useHandleCommentsReturn = {
	comment: string
	handleComment: Dispatch<SetStateAction<string>>
}

export const useHandleComments = (
	inputValue: string
): useHandleCommentsReturn => {
	const [comment, setComment] = useState<string>(inputValue)

	return { comment, handleComment: setComment }
}

// const { getLocalStorageValues, setLocalStorageValues } = useLocalStorage()

// const commentsData: CommentsData | null =
// 	getLocalStorageValues('commentsData')

// type handleSubmitProps = {
// 	level: number
// 	commentId?: number
// 	replyingTo?: string
// }

// function handleSubmit({ level, commentId, replyingTo }: handleSubmitProps) {

// 	level === 2 && commentId !== undefined
// 		? commentsData?.comments?.[commentId].replies?.push(newComment)
// 		: commentsData?.comments?.push(newComment)

// 	setLocalStorageValues('commentsData', commentsData)
// 	getLocalStorageValues('commentsData')
// 	setComment('')
// 	console.log('oi', {
// 		level,
// 		commentId,
// 		replyingTo
// 	})
// }
