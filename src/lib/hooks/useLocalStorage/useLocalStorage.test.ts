import { act, renderHook } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

describe('useLocalStorage', () => {
    test('returns null initially', async () => {
        const { result } = renderHook(() => useLocalStorage('foo'))
        expect(result.current[0]).toBe(null)
    })

    test('returns value from localStorage', async () => {
        window.localStorage.setItem('foo', JSON.stringify('bar'))

        const { result } = renderHook(() => useLocalStorage('foo'))

        await act(async () => {})
        expect(result.current[0]).toBe('bar')
    })

    test('updates localStorage when value is set', async () => {
        const { result } = renderHook(() => useLocalStorage('foo'))

        act(() => {
            const setValue = result.current[1]
            setValue('bar')
        })

        expect(result.current[0]).toBe('bar')
        expect(window.localStorage.getItem('foo')).toBe(JSON.stringify('bar'))
    })

    test('removes value from localStorage when set to null', async () => {
        window.localStorage.setItem('foo', JSON.stringify('bar'))

        const { result } = renderHook(() => useLocalStorage('foo'))

        act(() => {
            const setValue = result.current[1]
            setValue(null)
        })

        expect(result.current[0]).toBe(null)
        expect(window.localStorage.getItem('foo')).toBe(null)
    })

    test('updates value on storage event', async () => {
        const { result } = renderHook(() => useLocalStorage('foo'))

        act(() => {
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key: 'foo',
                    newValue: JSON.stringify('bar'),
                })
            )
        })

        expect(result.current[0]).toBe('bar')

        act(() => {
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key: 'foo',
                    newValue: null,
                })
            )
        })

        expect(result.current[0]).toBe(null)

        act(() => {
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key: 'foo',
                    newValue: JSON.stringify('bar'),
                })
            )
        })

        expect(result.current[0]).toBe('bar')

        act(() => {
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key: null,
                    newValue: null,
                })
            )
        })

        expect(result.current[0]).toBe(null)
    })

    test('removes storage event listener on unmount', async () => {
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

        const { unmount } = renderHook(() => useLocalStorage('foo'))

        unmount()

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'storage',
            expect.any(Function)
        )
    })
})
