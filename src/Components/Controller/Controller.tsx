import { useEffect, useState } from 'react'
import { useFetch, useFetchReturn } from '../../Hooks/useFetch'

import { CommentsData } from '../../Types'
import { Container } from '../Container'
import { useLocalStorage } from '../../Hooks'

export const Controller = () => {
	const { getLocalStorageValues, setLocalStorageValues } = useLocalStorage()
	const [commentsData, setCommentsData] = useState<CommentsData>()
	const { data, fetching, request } = useFetch() as useFetchReturn<CommentsData>

	useEffect(() => {
		const localStorageValues: CommentsData | null =
			getLocalStorageValues('commentsData')

		if (localStorageValues) setCommentsData(localStorageValues)
		request({ url: 'data.json' })

		if (!fetching && !localStorageValues) {
			setCommentsData(data)
			setLocalStorageValues('commentsData', data)
		}
	}, [fetching])

	return <Container commentsData={commentsData} />
}
