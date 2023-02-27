import { UseFetchReturn, useFetch, useLocalStorage } from '../../Hooks'
import { useCallback, useEffect, useState } from 'react'

import { CommentsData } from '../../Types'

type UseControllerReturn = {
	commentsData?: CommentsData
	onUpdate: () => void
}

export function useController(): UseControllerReturn {
	const { getLocalStorageValues, setLocalStorageValues } = useLocalStorage()
	const { data, fetching, request } = useFetch() as UseFetchReturn<CommentsData>

	const [commentsData, setCommentsData] = useState<CommentsData>()
	const [update, setUpdate] = useState(false)

	const onUpdate = useCallback(() => {
		setUpdate((prevState) => !prevState)
	}, [])

	useEffect(() => {
		const localStorageValues: CommentsData | null =
			getLocalStorageValues('commentsData')

		if (localStorageValues) return setCommentsData(localStorageValues)

		request({ url: 'data.json' })

		if (!fetching) {
			setCommentsData(data)
			setLocalStorageValues('commentsData', data)
		}
	}, [fetching, update])

	return { commentsData, onUpdate }
}
