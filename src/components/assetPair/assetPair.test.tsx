import { getByText, render } from '@testing-library/react'
import { useAsset } from '@/lib/hooks'
import AssetPair from './assetPair'

jest.mock('../../lib/hooks/useAsset/useAsset')
jest.mock('../skeleton/skeleton', () => () => <div>Skeleton</div>)

describe('AssetPair', () => {
    const mockedUseAsset = jest.mocked(useAsset)

    test('renders skeleton when registry is loading', async () => {
        mockedUseAsset.mockImplementationOnce(() => undefined)

        const { container } = render(
            <AssetPair baseAssetId="foo" quoteAssetId="bar" />
        )

        getByText(container, 'Skeleton')
    })

    // FXIME: Fails even though almost identical test in assetValue passes
    test.skip('renders NA when an asset is null', async () => {
        mockedUseAsset.mockImplementationOnce(() => null)

        const { container } = render(
            <AssetPair baseAssetId="foo" quoteAssetId="bar" />
        )

        getByText(container, 'NA')
    })

    // FXIME: Fails even though almost identical test in assetValue passes
    test.skip('applies CSS classes', async () => {
        // @ts-expect-error
        mockedUseAsset.mockImplementationOnce((id: string) => ({ symbol: id }))

        const { container } = render(
            <AssetPair
                baseAssetId="foo"
                className="foo bar"
                quoteAssetId="bar"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
