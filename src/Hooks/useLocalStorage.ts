export default function useLocalStorage() {
	function setLocalStorageValues<T>(key: string, value: T) {
		window.localStorage.setItem(key, JSON.stringify(value))
	}

	function getLocalStorageValues(key: string) {
		const getLocalStorage = window.localStorage.getItem(key)

    if (getLocalStorage === null) return null

    if (getLocalStorage === 'undefined') return undefined

    return JSON.parse(getLocalStorage)
	}

	return { getLocalStorageValues, setLocalStorageValues }
}
