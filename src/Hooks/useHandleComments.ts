import { Dispatch, SetStateAction, useState } from 'react'

type useHandleCommentsReturn = {
	comment: string
	handleComment: Dispatch<SetStateAction<string>>
}

export function useHandleComments(inputValue: string): useHandleCommentsReturn {
	const [comment, setComment] = useState<string>(inputValue)

	return { comment, handleComment: setComment }
}
