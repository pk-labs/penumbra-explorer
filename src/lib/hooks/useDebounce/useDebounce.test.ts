import { act, renderHook } from '@testing-library/react'
import useDebounce from './useDebounce'

describe('useDebounce', () => {
    test('returns initial value immediately', async () => {
        const { result } = renderHook(() => useDebounce('foo', 500))
        expect(result.current).toBe('foo')
    })

    test('debounces value updates', async () => {
        const { rerender, result } = renderHook(
            ({ delay, value }) => useDebounce(value, delay),
            { initialProps: { delay: 500, value: 'foo' } }
        )

        rerender({ delay: 500, value: 'bar' })
        expect(result.current).toBe('foo')

        act(() => jest.advanceTimersByTime(250))
        expect(result.current).toBe('foo')

        act(() => jest.advanceTimersByTime(250))
        expect(result.current).toBe('bar')
    })

    test('resets debounce timer when value changes before delay completes', async () => {
        const { rerender, result } = renderHook(
            ({ delay, value }) => useDebounce(value, delay),
            { initialProps: { delay: 500, value: 'foo' } }
        )

        rerender({ delay: 500, value: 'bar' })
        act(() => jest.advanceTimersByTime(250))

        rerender({ delay: 500, value: 'baz' })
        act(() => jest.advanceTimersByTime(250))

        expect(result.current).toBe('foo')

        act(() => jest.advanceTimersByTime(250))
        expect(result.current).toBe('baz')
    })
})
