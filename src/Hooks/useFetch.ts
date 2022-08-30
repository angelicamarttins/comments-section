import { useCallback, useState } from 'react'

export type requestProps = {
	url: string
	options?: optionsData
}

type optionsData = {
	method: string
	headers?: Headers
}

export const useFetch = () => {
	const [data, setData] = useState()
	const [responseStatus, setResponseStatus] = useState<number>()

	const request = useCallback(
		async ({ url }: requestProps) => {
			try {
				const response = await fetch(url)

        setResponseStatus(response.status)

				const json = await response.json()

				setData(json)
			} catch (error) {
        throw new Error(`Error: ${responseStatus}`);

      }
		},
		[data]
	)

	return { data, request }
}
