import { useCallback, useState } from 'react'

export type UseFetchReturn<T> = {
	data?: T
	fetching: boolean
	request: ({ url, options }: RequestProps) => Promise<void>
}

type RequestProps = {
	url: string
	options?: OptionsData
}

type OptionsData = {
	method: string
	headers?: Headers
}

export function useFetch<T>(): UseFetchReturn<T> {
	const [data, setData] = useState()
	const [fetching, setFetching] = useState(true)
	const [responseStatus, setResponseStatus] = useState<number>()

	const request = useCallback(
		async ({ url, options }: RequestProps) => {
			try {
				const response = await fetch(url, options)
				setResponseStatus(response.status)

				const json = await response.json()
				setData(json)

				data ?? setFetching(false)
			} catch (error) {
				throw new Error(`Error: ${responseStatus}`)
			}
		},
		[data]
	)

	return { data, fetching, request }
}
