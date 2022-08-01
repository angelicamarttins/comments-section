import { useEffect } from 'react'
import useFetch from './Hooks/useFetch'

function App() {
	const data = useFetch()

	console.log(data)
	return <div>{data?.comments[0].content}</div>
}

export default App
