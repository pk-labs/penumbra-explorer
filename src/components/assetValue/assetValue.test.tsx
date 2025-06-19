import { render } from '@testing-library/react'
import AssetValue from './assetValue'

jest.mock('../../lib/hooks/useAsset/useAsset', () => (id: string) => ({
    symbol: id,
}))

describe('AssetValue', () => {
    test('applies CSS classes', async () => {
        const { container } = render(
            <AssetValue amount={0} assetId="foo" className="foo bar" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
