import { useCallback, useEffect, useState } from 'react'

const useLocalStorage = <T>(key: string) => {
    const isClient = typeof window?.localStorage !== 'undefined'

    const getStoredValue = useCallback(() => {
        if (!isClient) {
            return null
        }

        try {
            const item = window.localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : null
        } catch (e) {
            console.error(e)
            return null
        }
    }, [isClient, key])

    const [storedValue, setStoredValue] = useState<null | T>(getStoredValue)

    const setValue = useCallback(
        (value: T) => {
            if (!isClient) {
                return
            }

            try {
                setStoredValue(value)
                window.localStorage.setItem(key, JSON.stringify(value))
            } catch (e) {
                console.error(e)
            }
        },
        [isClient, key]
    )

    useEffect(() => {
        if (!isClient) {
            return
        }

        const onStorage = (event: StorageEvent) => {
            if (event.key === key && event.newValue) {
                try {
                    setStoredValue(JSON.parse(event.newValue) as T)
                } catch (e) {
                    console.error(e)
                }
            } else if (event.key === key && !event.newValue) {
                setStoredValue(null)
            }
        }

        window.addEventListener('storage', onStorage)

        return () => window.removeEventListener('storage', onStorage)
    }, [isClient, key])

    const removeItem = useCallback(() => {
        if (!isClient) {
            return
        }

        try {
            localStorage.removeItem(key)
            setStoredValue(null)
        } catch (e) {
            console.error(e)
        }
    }, [isClient, key])

    const clear = useCallback(() => {
        if (!isClient) {
            return
        }

        try {
            localStorage.clear()
            setStoredValue(null)
        } catch (e) {
            console.error(e)
        }
    }, [isClient])

    return {
        clear,
        removeItem,
        setValue,
        value: storedValue,
    }
}

export default useLocalStorage
