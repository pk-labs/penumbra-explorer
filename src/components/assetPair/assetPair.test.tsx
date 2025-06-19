import { render } from '@testing-library/react'
import AssetPair from './assetPair'

jest.mock('../../lib/hooks/useAsset/useAsset', () => (id: string) => ({
    symbol: id,
}))

describe('AssetPair', () => {
    test('applies CSS classes', async () => {
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
