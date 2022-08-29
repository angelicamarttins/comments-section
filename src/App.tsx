import { Comments } from './Components/Comments/Comments'
import { NewComment } from './Components/NewComment/NewComment'
import useLocalStorage from './Hooks/useLocalStorage'
import { CommentsType } from './Types/Types'

function App() {
	const { commentsData, addLocalStorageValues } = useLocalStorage()
	console.log('app')

	return (
		<>
			<button onClick={() => addLocalStorageValues('teste', { teste: 123 })}>
				Teste
			</button>
			{commentsData &&
				commentsData.comments.map((comment: CommentsType, index) => {
					return <Comments index={index} key={comment.id} {...comment} />
				})}
			<NewComment />
		</>
	)
}

export default App
