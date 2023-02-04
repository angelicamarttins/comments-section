type UseHandleLocalStorageReturn = {
	getLocalStorageValues: <T>(key: string) => T | null
	hasLocalStorageValues: <T>(key: string) => T | null
	setLocalStorageValues: <T>(key: string, value: T) => void
}

export function useLocalStorage(): UseHandleLocalStorageReturn {
	function getLocalStorageValues<T>(key: string): T | null {
		const getLocalStorage = window.localStorage.getItem(key)

		return getLocalStorage ? JSON.parse(getLocalStorage) : getLocalStorage
	}

	function hasLocalStorageValues<T>(key: string): T | null {
		return getLocalStorageValues(key)
	}

	function setLocalStorageValues<T>(key: string, value: T) {
		window.localStorage.setItem(key, JSON.stringify(value))
	}

	return { getLocalStorageValues, hasLocalStorageValues, setLocalStorageValues }
}
