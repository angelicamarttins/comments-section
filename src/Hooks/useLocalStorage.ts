export default function useLocalStorage() {
	function setLocalStorageValues<T>(key: string, value: T) {
		window.localStorage.setItem(key, JSON.stringify(value))
	}

	function getLocalStorageValues<T>(key: string): T | null {
		const getLocalStorage = window.localStorage.getItem(key)

    if (getLocalStorage === null || getLocalStorage === 'undefined') return null

    return JSON.parse(getLocalStorage)
	}

	return { getLocalStorageValues, setLocalStorageValues }
}
