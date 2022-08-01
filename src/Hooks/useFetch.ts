import { useEffect, useState } from 'react'
import { Data } from '../Types/Types'

function useFetch() {
	const [data, setData] = useState<Data>()

	useEffect(() => {
		const getLocalStorage = window.localStorage.getItem('data')

		getLocalStorage
			? setData(JSON.parse(getLocalStorage))
			: fetch('data.json')
					.then((res) => res.json())
					.then((data) => {
						setData(data)
						window.localStorage.setItem('data', JSON.stringify(data))
					}),
			[]
	})

	return data
}

export default useFetch
