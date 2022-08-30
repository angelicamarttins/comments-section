import { useEffect } from 'react'
import { Comments } from './Components/Comments/Comments'
import { NewComment } from './Components/NewComment/NewComment'
import { requestProps, useFetch } from './Hooks/useFetch'
import useLocalStorage from './Hooks/useLocalStorage'
import { CommentsData, CommentsType } from './Types/Types'

function App() {
	const {
		data: commentsData,
		request
	}: {
		data?: CommentsData
		request: ({ url }: requestProps) => Promise<void>
	} = useFetch()

	useEffect(() => {
		request({ url: 'data.json' })
	}, [])

	console.log(commentsData)
	return (
		<>
			{/* <button onClick={() => addLocalStorageValues('teste', { teste: 123 })}>
				Teste
			</button> */}
			{commentsData &&
				commentsData.comments.map((comment: CommentsType, index) => {
					return <Comments index={index} key={comment.id} {...comment} />
				})}
			<NewComment />
		</>
	)
}

export default App
