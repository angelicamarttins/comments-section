export default function useLocalStorage() {
	function setLocalStorageValues<T>(key: string, value: T) {
		window.localStorage.setItem(key, JSON.stringify(value))
	}

	function getLocalStorageValues<T>(key: string): T | null {
		const getLocalStorage = window.localStorage.getItem(key)

		return getLocalStorage ? JSON.parse(getLocalStorage) : getLocalStorage
	}

	function hasLocalStorageValues<T>(key: string): T | null {
		// if (value) {
		// 	setLocalStorageValues(key, value)
		// 	return value
		// }

		const localStorageValues: T | null = getLocalStorageValues(key)

		return localStorageValues
	}

	return { getLocalStorageValues, hasLocalStorageValues, setLocalStorageValues }
}
