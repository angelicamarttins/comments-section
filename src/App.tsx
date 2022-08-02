import { useEffect } from 'react'
import { useHandleComments } from './Hooks/useHandleComments'
import useFetch from './Hooks/useLocalStorageValues'

function App() {
  
  const commentsData = useFetch()
  console.log(commentsData)

	const { comments, handleComments } = useHandleComments()

	return (
		<form>
			<input
				type="text"
				value={comments}
				onChange={({ target }) => handleComments(target.value)}
			/>
			<p>{comments}</p>
		</form>
	)
}

export default App
