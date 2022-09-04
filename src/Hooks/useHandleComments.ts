import { useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { CommentsType } from '../Types/Types'

export const useHandleComments = () => {
	const { commentsData, getLocalStorageValues, setLocalStorageValues } =
		useLocalStorage()
	const hasIdCountInLocalStorage = getLocalStorageValues('idCount')

	const [comments, setComments] = useState('')
	const [idCount, setIdCount] = useState<number>(() => bla())

	function bla() {
		if (hasIdCountInLocalStorage) return Number(hasIdCountInLocalStorage)

		setLocalStorageValues('idCount', 5)
		return 5
	}

	// console.log(typeof Number(hasIdCountInLocalStorage), idCount)

	function handleComments(inputValue: string) {
		setComments(inputValue)
	}

	function handleSubmit(index: number, isReply: boolean, replyingTo?: string) {
		setIdCount(idCount + 1)

		const newComment: CommentsType = {
			id: idCount,
			content: comments,
			createdAt: 'Today',
			score: 0,
			...(isReply && { replyingTo }),
			user: {
				image: {
					png: './assets/images/avatars/image-juliusomo.png',
					webp: './assets/images/avatars/image-juliusomo.webp'
				},
				username: 'juliusomo'
			}
		}

		// console.log(newComment)
		// console.log(commentsData?.comments[index].replies)

		!isReply && commentsData
			? commentsData?.comments.push(newComment)
			: commentsData?.comments?.[index]?.replies?.push(newComment)

		setLocalStorageValues('commentsData', commentsData)

		// window.localStorage.setItem('commentsData', JSON.stringify(commentsData))

		setComments('')
	}

	setLocalStorageValues('idCount', idCount)
	return { comments, idCount, handleComments, handleSubmit }
}

export default useHandleComments
