import { useEffect, useState } from 'react'
import { CommentsData } from '../Types/Types'

export default function useLocalStorage() {
	const [commentsData, setCommentsData] = useState<CommentsData>()

	function setLocalStorageValues<T>(key: string, value: T) {
		window.localStorage.setItem(key, JSON.stringify(value))
	}

	function getLocalStorageValues(key: string) {
		const getLocalStorage = window.localStorage.getItem(key)

		return getLocalStorage
	}

	useEffect(() => {
		const getLocalStorage = getLocalStorageValues('commentsData')

		getLocalStorage
			? setCommentsData(JSON.parse(getLocalStorage))
			: fetch('data.json')
					.then((res) => res.json())
					.then((data) => {
						setCommentsData(data)

						setLocalStorageValues('commentsData', data)
						// window.localStorage.setItem(
						// 'commentsData',
						// JSON.stringify(data)
						// )
					})
	}, [])

	return { commentsData, getLocalStorageValues, setLocalStorageValues }
}
