export default function useLocalStorage() {
	function setLocalStorageValues<T>(key: string, value: T) {
		window.localStorage.setItem(key, JSON.stringify(value))
	}

	function getLocalStorageValues(key: string) {
		const getLocalStorage = window.localStorage.getItem(key)

		return getLocalStorage
	}

	return { getLocalStorageValues, setLocalStorageValues }
}
