import { useEffect, useState } from 'react'
import { CommentsData } from '../Types/Types'

function useLocalStorageValues() {
	const [commentsData, setCommentsData] = useState<CommentsData>()

	useEffect(() => {
		const getLocalStorage = window.localStorage.getItem('commentsData')

		getLocalStorage
			? setCommentsData(JSON.parse(getLocalStorage))
			: fetch('data.json')
					.then((res) => res.json())
					.then((data) => {
						setCommentsData(data)
						window.localStorage.setItem('commentsData', JSON.stringify(data))
					})
	}, [])

	return commentsData
}

export default useLocalStorageValues
