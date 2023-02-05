import { useCallback, useEffect, useState } from 'react'

import { CommentsData } from '../Types'
import { useLocalStorage } from './useLocalStorage'

type UseUpdateScoreProps = {
	id: string
	index: number
	level: number
	score: number
}

type UseUpdateScoreReturn = {
	updatedScore: number
	onDecrementScore: () => void
	onIncrementScore: () => void
}

export function useUpdateScore({
	id,
	index,
	level,
	score
}: UseUpdateScoreProps): UseUpdateScoreReturn {
	const { getLocalStorageValues, setLocalStorageValues } = useLocalStorage()

	const [updatedScore, setUpdatedScore] = useState(score)

	const onDecrementScore = useCallback(() => {
		setUpdatedScore((prevState) => prevState - 1)
	}, [])

	const onIncrementScore = useCallback(() => {
		setUpdatedScore((prevState) => prevState + 1)
	}, [])

	useEffect(() => {
		if (score !== updatedScore) {
			const commentsData: CommentsData | null =
				getLocalStorageValues('commentsData')
			const a =
				commentsData &&
				commentsData.comments.filter((comment) => comment.id === id)
			console.log('tem certeza', id, a)
		}
	}, [updatedScore])

	// setLocalStorageValues('commentsData', commentsData)

	return { updatedScore, onDecrementScore, onIncrementScore }
}
