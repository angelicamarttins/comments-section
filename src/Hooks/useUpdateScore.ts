import { useCallback, useEffect, useMemo, useState } from 'react'

import { useUpdateComment } from './useUpdateComment'

type UseUpdateScoreProps = {
	id: string
	level: number
	originalScore: number
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
	level,
	originalScore,
	score
}: UseUpdateScoreProps): UseUpdateScoreReturn {
	const { updateComment } = useUpdateComment()

	const [hasUserVotedNow, setHasUserVotedNow] = useState(false)
	const [maxVotes, minVotes] = [originalScore + 1, originalScore - 1]
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
		setHasUserVotedNow(true)
	}, [updatedScore])

	const onIncrementScore = useCallback(() => {
		!didUserIncrementVote && setUpdatedScore((prevState) => prevState + 1)
		setHasUserVotedNow(true)
	}, [updatedScore])

	useEffect(() => {
		if (hasUserVotedNow) {
			updateComment({
				id,
				level,
				updatedProp: { score: updatedScore }
			})
		}
	}, [hasUserVotedNow, updatedScore])

	return {
		didUserDecrementVote,
		didUserIncrementVote,
		updatedScore,
		onDecrementScore,
		onIncrementScore
	}
}
