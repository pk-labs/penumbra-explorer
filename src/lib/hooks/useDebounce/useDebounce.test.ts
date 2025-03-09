import { act, renderHook } from '@testing-library/react'
import useDebounce from './useDebounce'

describe('useDebounce', () => {
    test('debounces a value', () => {
        const { rerender, result } = renderHook(
            ({ value }) => useDebounce(value, 500),
            { initialProps: { value: 'foo' } }
        )

        expect(result.current[0]).toBe('foo')

        rerender({ value: 'bar' })

        act(() => jest.advanceTimersByTime(499))
        expect(result.current[0]).toBe('foo')

        act(() => jest.advanceTimersByTime(1))
        expect(result.current[0]).toBe('bar')
    })

    test('debounces an async function', async () => {
        const func = jest.fn(async (x: number) => x * 2)

        const { result } = renderHook(() => useDebounce(func, 300))
        const [debouncedFunc] = result.current

        let promise: Promise<number>

        act(() => {
            promise = debouncedFunc(10)
        })

        act(() => jest.advanceTimersByTime(299))
        expect(func).not.toHaveBeenCalled()

        act(() => jest.advanceTimersByTime(1))
        await expect(promise!).resolves.toBe(20)

        expect(func).toHaveBeenCalledTimes(1)
        expect(func).toHaveBeenCalledWith(10)
    })

    it('can be canceled', () => {
        const func = jest.fn()

        const { result } = renderHook(() => useDebounce(func, 300))
        const [debouncedFunc, cancel] = result.current

        act(() => {
            debouncedFunc()
            cancel()
            jest.advanceTimersByTime(300)
        })

        expect(func).not.toHaveBeenCalled()
    })
})
