import { useCallback, useState } from 'react'
import useLocalStorage from './useLocalStorage'

export type useFetchReturn<T> = {
	data?: T
  fetching: boolean
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
  const [fetching, setFetching] = useState(true)
	const [responseStatus, setResponseStatus] = useState<number>()

	const request = useCallback(
		async ({ url, options }: requestProps) => {
			try {
				const response = await fetch(url, options)
				setResponseStatus(response.status)

				const json = await response.json()
				setData(json)

        data !== null && setFetching(false)
			} catch (error) {
				throw new Error(`Error: ${responseStatus}`)
			}
		},
		[data]
	)

	return { data, fetching, request }
}
