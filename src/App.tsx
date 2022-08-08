import { useEffect } from 'react'
import { useHandleComments } from './Hooks/useHandleComments'
import useLocalStorageValues from './Hooks/useLocalStorageValues'

function App() {
	const commentsData = useLocalStorageValues()
	console.log("commentsData")

	const { comments, handleComments, handleSubmit } = useHandleComments()

	return (
		<form onSubmit={(event) => handleSubmit(event)}>
			<input
				type="text"
				value={comments}
				onChange={({ target }) => handleComments(target.value)}
			/>
			<p>{comments}</p>
			<button>Submit</button>
		</form>
	)
}

export default App
