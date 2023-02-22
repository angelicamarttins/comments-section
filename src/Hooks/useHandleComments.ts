import { Dispatch, SetStateAction, useState } from 'react'

type UseHandleCommentsReturn = {
	comment: string
	handleComment: Dispatch<SetStateAction<string>>
}

export function useHandleComments(inputValue: string): UseHandleCommentsReturn {
	const [comment, setComment] = useState<string>(inputValue)

	return { comment, handleComment: setComment }
}
