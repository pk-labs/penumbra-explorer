import { useCallback, useEffect, useState } from 'react'

type Value<T> = null | T

const useLocalStorage = <T>(key: string): [Value<T>, (value: T) => void] => {
    const [value, setValue] = useState<Value<T>>(null)

    useEffect(() => {
        const storageValue = window.localStorage.getItem(key)
        setValue(storageValue !== null ? JSON.parse(storageValue) : null)
    }, [key])

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === null) {
                setValue(null)
            } else if (e.key === key) {
                if (e.newValue === null) {
                    setValue(null)
                } else {
                    setValue(JSON.parse(e.newValue))
                }
            }
        }

        window.addEventListener('storage', onStorage)

        return () => window.removeEventListener('storage', onStorage)
    }, [key])

    const setStorageValue = useCallback(
        (value: Value<T>) => {
            setValue(value)

            if (value === null) {
                window.localStorage.removeItem(key)
            } else {
                window.localStorage.setItem(key, JSON.stringify(value))
            }
        },
        [key]
    )

    return [value, setStorageValue]
}

export default useLocalStorage
