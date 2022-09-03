import { useEffect } from 'react'
import { Comments } from './Components/Comments/Comments'
import { NewComment } from './Components/NewComment/NewComment'
import { useFetch, useFetchReturn } from './Hooks/useFetch'
import { CommentsData, CommentsType } from './Types/Types'

function App() {
	const { data: commentsData, request } =
		useFetch() as useFetchReturn<CommentsData>

	useEffect(() => {
		request({ url: 'data.json' })
	}, [])

	console.log(commentsData)
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
