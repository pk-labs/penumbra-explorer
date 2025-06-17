import { act, renderHook } from '@testing-library/react'
import useTicker from './useTicker'

describe('useTicker', () => {
    test('returns a timestamp every second', async () => {
        const { result } = renderHook(() => useTicker())
        const initialTick = result.current

        act(() => jest.advanceTimersByTime(1000))
        expect(result.current.unix() - initialTick.unix()).toBe(1)

        act(() => jest.advanceTimersByTime(1000))
        expect(result.current.unix() - initialTick.unix()).toBe(2)
    })

    test('is disabled when passing false', async () => {
        const { result } = renderHook(() => useTicker(false))
        const initialTick = result.current

        act(() => jest.advanceTimersByTime(1000))
        expect(result.current.unix() - initialTick.unix()).toBe(0)

        act(() => jest.advanceTimersByTime(1000))
        expect(result.current.unix() - initialTick.unix()).toBe(0)
    })

    test('returns the same timestamp for all listeners', async () => {
        const { result: result1 } = renderHook(() => useTicker())
        const { result: result2 } = renderHook(() => useTicker())

        expect(result1.current).toBe(result2.current)

        act(() => jest.advanceTimersByTime(1000))
        expect(result1.current).toBe(result2.current)

        act(() => jest.advanceTimersByTime(1000))
        expect(result1.current).toBe(result2.current)
    })
})
