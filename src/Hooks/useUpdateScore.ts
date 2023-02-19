import { CommentsData, CommentsType } from '../Types'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useLocalStorage } from './useLocalStorage'
import { useUpdateComment } from './useUpdateComment'

type UseUpdateScoreProps = {
	id?: string
	index: number
	level: number
	score?: number
}

type UseUpdateScoreReturn = {
	didUserDecrementVote: boolean
	didUserIncrementVote: boolean
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
	const { updateComment } = useUpdateComment()
	const { setLocalStorageValues } = useLocalStorage()

	const [didUserVote, setDidUserVote] = useState(false)
	const [maxVotes, minVotes] = [score! + 1, score! - 1]
	const [updatedScore, setUpdatedScore] = useState(score || 0)

	const didUserDecrementVote = useMemo(
		() => !(updatedScore > minVotes) || !updatedScore,
		[updatedScore]
	)

	const didUserIncrementVote = useMemo(
		() => !(updatedScore < maxVotes),
		[updatedScore]
	)

	const onDecrementScore = useCallback(() => {
		!didUserDecrementVote && setUpdatedScore((prevState) => prevState - 1)
		setDidUserVote(true)
	}, [updatedScore])

	const onIncrementScore = useCallback(() => {
		!didUserIncrementVote && setUpdatedScore((prevState) => prevState + 1)
		setDidUserVote(true)
	}, [updatedScore])

	useEffect(() => {
		if (didUserVote) {
			updateComment({
				id,
				index,
				level,
				updatedScore
			})
		}
	}, [didUserVote, updatedScore])

	return {
		didUserDecrementVote,
		didUserIncrementVote,
		updatedScore,
		onDecrementScore,
		onIncrementScore
	}
}
