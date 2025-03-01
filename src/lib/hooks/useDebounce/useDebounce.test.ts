import { act, renderHook } from '@testing-library/react'
import useDebounce from './useDebounce'

describe('useDebounce', () => {
    it('returns initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('foo', 500))
        expect(result.current).toBe('foo')
    })

    it('debounces value updates', () => {
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

    it('resets debounce timer when value changes before delay completes', () => {
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
