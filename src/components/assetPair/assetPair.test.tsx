import { getByText, render } from '@testing-library/react'

jest.mock('../skeleton/skeleton', () => () => <div>Skeleton</div>)

describe('AssetPair', () => {
    beforeEach(jest.resetModules)

    test('renders skeleton when registry is loading', async () => {
        jest.doMock('../../lib/hooks/useAsset/useAsset', () => () => undefined)

        const { default: AssetPair } = await import('./assetPair')

        const { container } = render(
            <AssetPair baseAssetId="foo" quoteAssetId="bar" />
        )

        getByText(container, 'Skeleton')
    })

    test('renders NA when an asset is null', async () => {
        jest.doMock('../../lib/hooks/useAsset/useAsset', () => () => null)

        const { default: AssetPair } = await import('./assetPair')

        const { container } = render(
            <AssetPair baseAssetId="foo" quoteAssetId="bar" />
        )

        getByText(container, 'NA')
    })

    test('applies CSS classes', async () => {
        jest.doMock(
            '../../lib/hooks/useAsset/useAsset',
            () => (id: string) => ({ symbol: id })
        )

        const { default: AssetPair } = await import('./assetPair')

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
