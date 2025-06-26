import { getByText, render } from '@testing-library/react'

jest.mock('../skeleton/skeleton', () => () => <div>Skeleton</div>)

describe('AssetValue', () => {
    beforeEach(jest.resetModules)

    test('renders skeleton when registry is loading', async () => {
        jest.doMock('../../lib/hooks/useAsset/useAsset', () => () => undefined)

        const { default: AssetValue } = await import('./assetValue')
        const { container } = render(<AssetValue amount={0} assetId="foo" />)

        getByText(container, 'Skeleton')
    })

    test('renders NA when an asset is null', async () => {
        jest.doMock('../../lib/hooks/useAsset/useAsset', () => () => null)

        const { default: AssetValue } = await import('./assetValue')
        const { container } = render(<AssetValue amount={0} assetId="foo" />)

        getByText(container, 'NA')
    })

    test('applies CSS classes', async () => {
        jest.doMock(
            '../../lib/hooks/useAsset/useAsset',
            () => (id: string) => ({ symbol: id })
        )

        const { default: AssetValue } = await import('./assetValue')

        const { container } = render(
            <AssetValue amount={0} assetId="foo" className="foo bar" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
