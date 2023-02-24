import { useCallback, useState } from 'react'

type UseFlagReturn = [
	flag: boolean,
	setFlagFalse: () => void,
	setFlagTrue: () => void
]

export function useFlag(initialFlag = false): UseFlagReturn {
	const [flag, setFlag] = useState(initialFlag)

	const setFlagFalse = useCallback(() => setFlag(false), [flag])

	const setFlagTrue = useCallback(() => setFlag(true), [flag])

	return [flag, setFlagTrue, setFlagFalse]
}
