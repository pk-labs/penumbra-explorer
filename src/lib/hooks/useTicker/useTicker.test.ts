import { act, renderHook } from '@testing-library/react'
import dayjs from '@/lib/dayjs'
import useTicker from './useTicker'

describe('useTicker', () => {
    test('returns a timestamp every second', () => {
        const { result } = renderHook(() => useTicker())
        const initialTick = result.current

        act(() => jest.advanceTimersByTime(1000))
        expect(dayjs(result.current).subtract(initialTick).second()).toBe(1)

        act(() => jest.advanceTimersByTime(1000))
        expect(dayjs(result.current).subtract(initialTick).second()).toBe(2)
    })

    test('is disabled when passing false', () => {
        const { result } = renderHook(() => useTicker(false))
        const initialTick = result.current

        act(() => jest.advanceTimersByTime(1000))
        expect(dayjs(result.current).subtract(initialTick).second()).toBe(0)

        act(() => jest.advanceTimersByTime(1000))
        expect(dayjs(result.current).subtract(initialTick).second()).toBe(0)
    })

    test('returns the same timestamp for all listeners', () => {
        const { result: result1 } = renderHook(() => useTicker())
        const { result: result2 } = renderHook(() => useTicker())

        expect(result1.current).toBe(result2.current)

        act(() => jest.advanceTimersByTime(1000))
        expect(result1.current).toBe(result2.current)

        act(() => jest.advanceTimersByTime(1000))
        expect(result1.current).toBe(result2.current)
    })
})
