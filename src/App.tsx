import { useEffect } from 'react'
import useFetch from './Hooks/useLocalStorageValues'

function App() {
  const commentsData = useFetch()
	console.log(commentsData)


	return (
		<form>
			<input type="text" />
		</form>
	)
}

export default App
