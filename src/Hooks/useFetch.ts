import { useCallback, useState } from 'react'

export type useFetchReturn<T> = {
	data?: T
	request: ({ url, options }: requestProps) => Promise<void>
}

type requestProps = {
	url: string
	options?: optionsData
}

type optionsData = {
	method: string
	headers?: Headers
}

export const useFetch = <T>(): useFetchReturn<T> => {
	const [data, setData] = useState()
	const [responseStatus, setResponseStatus] = useState<number>()

	const request = useCallback(
		async ({ url, options }: requestProps) => {
			try {
				const response = await fetch(url, options)
				setResponseStatus(response.status)

				const json = await response.json()

				setData(json)
			} catch (error) {
				throw new Error(`Error: ${responseStatus}`)
			}
		},
		[data]
	)

	return { data, request }
}
