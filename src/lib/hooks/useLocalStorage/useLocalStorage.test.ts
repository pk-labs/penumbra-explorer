import { act, renderHook } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

describe('useLocalStorage', () => {
    test('returns null when empty', async () => {
        const { result } = renderHook(() => useLocalStorage('foo'))
        expect(result.current.value).toBeNull()
    })

    test('returns value', async () => {
        window.localStorage.setItem('foo', JSON.stringify('bar'))
        const { result } = renderHook(() => useLocalStorage('foo'))

        expect(result.current.value).toBe('bar')
    })

    test('sets value', async () => {
        const { result } = renderHook(() => useLocalStorage('foo'))

        act(() => result.current.setValue('bar'))
        expect(result.current.value).toBe('bar')
    })

    test('removes item', async () => {
        window.localStorage.setItem('foo', JSON.stringify('bar'))
        const { result } = renderHook(() => useLocalStorage('foo'))

        expect(result.current.value).toBe('bar')

        act(() => result.current.removeItem())
        expect(result.current.value).toBeNull()
    })

    test('clears localStorage', async () => {
        window.localStorage.setItem('foo', JSON.stringify('bar'))
        const { result } = renderHook(() => useLocalStorage<string>('foo'))

        expect(result.current.value).toBe('bar')

        act(() => result.current.clear())
        expect(result.current.value).toBeNull()
    })

    test('supports objects', async () => {
        const { result } = renderHook(() => useLocalStorage('foo'))

        act(() => result.current.setValue({ bar: 'baz' }))
        expect(result.current.value).toEqual({ bar: 'baz' })
    })

    test('listens to storage events', async () => {
        const addEventListener = jest.spyOn(window, 'addEventListener')
        const removeEventListener = jest.spyOn(window, 'removeEventListener')
        const { unmount } = renderHook(() => useLocalStorage('foo'))

        expect(addEventListener).toHaveBeenCalledWith(
            'storage',
            expect.any(Function)
        )

        unmount()

        expect(removeEventListener).toHaveBeenCalledWith(
            'storage',
            expect.any(Function)
        )
    })

    test('storage event updates value', async () => {
        const { result } = renderHook(() => useLocalStorage('foo'))

        expect(result.current.value).toBeNull()

        act(() => {
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key: 'foo',
                    newValue: JSON.stringify('bar'),
                    storageArea: window.localStorage,
                })
            )
        })

        expect(result.current.value).toBe('bar')
    })

    test('handles SSR gracefully', async () => {
        const originalLocalStorage = window.localStorage

        Object.defineProperty(window, 'localStorage', {
            value: undefined,
            writable: true,
        })

        const { result } = renderHook(() => useLocalStorage('foo'))

        expect(result.current.value).toBeNull()

        Object.defineProperty(window, 'localStorage', {
            value: originalLocalStorage,
            writable: true,
        })
    })

    test('handles parsing errors gracefully', async () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        // Set invalid JSON value
        window.localStorage.setItem('foo', 'bar')

        const { result } = renderHook(() => useLocalStorage('foo'))

        expect(result.current.value).toBeNull()
        expect(consoleError).toHaveBeenCalled()
    })
})
