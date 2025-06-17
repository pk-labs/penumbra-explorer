import { act, renderHook } from '@testing-library/react'
import useDocumentVisible from './useDocumentVisible'

describe('useDocumentVisible', () => {
    test('return true by default', async () => {
        const { result } = renderHook(() => useDocumentVisible())
        expect(result.current).toBe(true)
    })

    test('return visibility on change', async () => {
        const { result } = renderHook(() => useDocumentVisible())

        Object.defineProperty(document, 'hidden', {
            value: true,
            writable: true,
        })

        act(() => {
            document.dispatchEvent(new Event('visibilitychange'))
        })

        expect(result.current).toBe(false)

        Object.defineProperty(document, 'hidden', {
            value: false,
            writable: true,
        })

        act(() => {
            document.dispatchEvent(new Event('visibilitychange'))
        })

        expect(result.current).toBe(true)
    })
})
