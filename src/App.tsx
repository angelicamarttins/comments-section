import { useEffect, useState } from 'react'
import { Comments } from './Components/Comments/Comments'
import { NewComment } from './Components/NewComment/NewComment'
import { useFetch, useFetchReturn } from './Hooks/useFetch'
import useLocalStorage from './Hooks/useLocalStorage'
import { CommentsData, CommentsType } from './Types/Types'

function App() {
	const [commentsData, setCommentsData] = useState<CommentsData>()
	const { data, fetching, request } = useFetch() as useFetchReturn<CommentsData>

	const { getLocalStorageValues, setLocalStorageValues } = useLocalStorage()

	useEffect(() => {
		const localStorageValues: CommentsData | null =
			getLocalStorageValues('commentsData')

		if (localStorageValues) setCommentsData(localStorageValues)

		request({ url: 'data.json' })

		if (!fetching) {
			setCommentsData(data)
			setLocalStorageValues('commentsData', data)
		}
	}, [fetching])

	return (
		<>
			{commentsData?.comments.map((comment: CommentsType, index: number) => {
				return <Comments index={index} key={comment.id} {...comment} />
			})}
			<NewComment />
		</>
	)
}

export default App
