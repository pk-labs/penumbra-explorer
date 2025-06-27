import { renderHook } from '@testing-library/react'
import useGetMetadata from '../useGetMetadata'

jest.mock('../useGetMetadata/useGetMetadata')

describe('useAsset', () => {
    const mockedUseGetMetadata = jest.mocked(useGetMetadata)

    test('returns undefined when metadata getter undefined', async () => {
        mockedUseGetMetadata.mockImplementationOnce(() => undefined)

        const { default: useAsset } = await import('./useAsset')
        const { result } = renderHook(() => useAsset('foo'))

        expect(result.current).toBeUndefined()
    })

    test('returns null when metadata undefined', async () => {
        mockedUseGetMetadata.mockImplementationOnce(() => () => undefined)

        const { default: useAsset } = await import('./useAsset')
        const { result } = renderHook(() => useAsset('foo'))

        expect(result.current).toBeNull()
    })

    test('returns metadata', async () => {
        // @ts-expect-error
        mockedUseGetMetadata.mockImplementationOnce(() => () => 'bar')

        const { default: useAsset } = await import('./useAsset')
        const { result } = renderHook(() => useAsset('foo'))

        expect(result.current).toBe('bar')
    })
})
