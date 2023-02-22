import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UseFetchReturn, useFetch, useLocalStorage } from '../../Hooks'

import { CommentsData } from '../../Types'

type UseControllerReturn = {
	commentsData?: CommentsData
	onUpdate: Dispatch<SetStateAction<boolean>>
}

export function useController(): UseControllerReturn {
	const { getLocalStorageValues, setLocalStorageValues } = useLocalStorage()
	const { data, fetching, request } = useFetch() as UseFetchReturn<CommentsData>

	const [commentsData, setCommentsData] = useState<CommentsData>()
	const [update, setUpdate] = useState(false)

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

	return { commentsData, onUpdate: setUpdate }
}
