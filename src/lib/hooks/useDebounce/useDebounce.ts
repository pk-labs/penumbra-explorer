import { useCallback, useEffect, useRef, useState } from 'react'

function useDebounce<T>(value: T, delay: number): [T, () => void]

function useDebounce<F extends (...args: any[]) => any>(
    func: F,
    delay: number
): [(...args: Parameters<F>) => Promise<Awaited<ReturnType<F>>>, () => void]

function useDebounce<T>(valueOrFunc: T, delay: number) {
    const valueOrFuncRef = useRef(valueOrFunc)
    const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null)

    const [debouncedValue, setDebouncedValue] = useState(
        typeof valueOrFunc !== 'function' ? valueOrFunc : undefined
    )

    useEffect(() => {
        valueOrFuncRef.current = valueOrFunc
    }, [valueOrFunc])

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }, [])

    useEffect(() => {
        if (typeof valueOrFuncRef.current !== 'function') {
            cancel()

            timeoutRef.current = setTimeout(() => {
                setDebouncedValue(valueOrFuncRef.current)
            }, delay)

            return cancel
        }
    }, [delay, cancel, valueOrFunc])

    const debouncedCallback = useCallback(
        (...args: any[]) =>
            new Promise((resolve, reject) => {
                cancel()

                timeoutRef.current = setTimeout(() => {
                    const result = (valueOrFuncRef.current as Function)(...args)
                    Promise.resolve(result).then(resolve).catch(reject)
                }, delay)
            }),
        [delay, cancel]
    )

    return typeof valueOrFunc === 'function'
        ? [debouncedCallback, cancel]
        : [debouncedValue, cancel]
}

export default useDebounce
