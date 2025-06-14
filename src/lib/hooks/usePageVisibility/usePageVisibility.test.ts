import { act, renderHook } from '@testing-library/react'
import usePageVisibility from './usePageVisibility'

const mockDocumentHidden = (hidden: boolean) => {
    Object.defineProperty(document, 'hidden', {
        configurable: true,
        value: hidden,
    })
}

describe('usePageVisibility', () => {
    beforeEach(() => mockDocumentHidden(false))

    afterEach(jest.clearAllMocks)

    it('return true when visible', () => {
        mockDocumentHidden(false)

        const { result } = renderHook(() => usePageVisibility())

        expect(result.current).toBe(true)
    })

    it('returns false when hidden', () => {
        mockDocumentHidden(true)

        const { result } = renderHook(() => usePageVisibility())

        expect(result.current).toBe(false)
    })

    it('returns visibility change', () => {
        mockDocumentHidden(false)

        const { result } = renderHook(() => usePageVisibility())

        expect(result.current).toBe(true)

        mockDocumentHidden(true)
        act(() => document.dispatchEvent(new Event('visibilitychange')))
        expect(result.current).toBe(false)

        mockDocumentHidden(false)
        act(() => document.dispatchEvent(new Event('visibilitychange')))
        expect(result.current).toBe(true)

        mockDocumentHidden(true)
        act(() => document.dispatchEvent(new Event('visibilitychange')))
        expect(result.current).toBe(false)
    })

    it('does not return visibility change after unmount', () => {
        mockDocumentHidden(false)

        const { result, unmount } = renderHook(() => usePageVisibility())

        expect(result.current).toBe(true)

        unmount()

        mockDocumentHidden(true)
        act(() => document.dispatchEvent(new Event('visibilitychange')))
        expect(result.current).toBe(true)
    })

    it('adds event listener on mount', () => {
        const addEventListenerSpy = jest.spyOn(document, 'addEventListener')

        renderHook(() => usePageVisibility())

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'visibilitychange',
            expect.any(Function)
        )

        addEventListenerSpy.mockRestore()
    })

    it('removes event listener on unmount', () => {
        const removeEventListenerSpy = jest.spyOn(
            document,
            'removeEventListener'
        )

        const { unmount } = renderHook(() => usePageVisibility())

        unmount()

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'visibilitychange',
            expect.any(Function)
        )

        removeEventListenerSpy.mockRestore()
    })
})
