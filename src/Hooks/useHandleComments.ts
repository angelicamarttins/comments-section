import { useState } from 'react'
import useLocalStorageValues from './useLocalStorageValues'
import { CommentsType } from '../Types/Types'

export const useHandleComments = () => {
	const commentsData = useLocalStorageValues()
  
	const [comments, setComments] = useState('')
	const [idCount, setIdCount] = useState(5)

	function handleComments(inputValue: string) {
		setComments(inputValue)
	}

	function handleSubmit(
		event: React.FormEvent<HTMLFormElement>,
		isReply?: boolean,
    replyingTo?: string
	) {
		event.preventDefault()

		setIdCount(idCount + 1)

		const newComment: CommentsType = {
			id: idCount,
			content: comments,
			createdAt: 'Today',
			score: 0,
			...(isReply && { replyingTo }),
			user: {
				image: {
					png: './images/avatars/image-juliusomo.png',
					webp: './images/avatars/image-juliusomo.webp'
				},
				username: 'juliusomo'
			}
		}

		console.log(isReply)

		!isReply && commentsData?.comments.push(newComment)

		window.localStorage.setItem('commentsData', JSON.stringify(commentsData))

		console.log(idCount)
		setComments('')
	}

	return { comments, handleComments, handleSubmit }
}

export default useHandleComments
