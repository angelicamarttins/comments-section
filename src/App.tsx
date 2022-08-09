import { useEffect } from 'react'
import { Comments } from './Components/Comments/Comments'
import { useHandleComments } from './Hooks/useHandleComments'
import useLocalStorageValues from './Hooks/useLocalStorageValues'
import { CommentsType } from './Types/Types'

function App() {
	const commentsData = useLocalStorageValues()
	console.log('commentsData')

	const { comments, handleComments, handleSubmit } = useHandleComments()

	return (
		<>
			{commentsData &&
				commentsData.comments.map((comment: CommentsType) => {
					return <Comments {...comment} />
				})}
		</>
	)
}

export default App
