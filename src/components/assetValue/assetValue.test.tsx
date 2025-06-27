import { getByText, render } from '@testing-library/react'
import { useAsset } from '@/lib/hooks'
import AssetValue from './assetValue'

jest.mock('../../lib/hooks/useAsset/useAsset')
jest.mock('../skeleton/skeleton', () => () => <div>Skeleton</div>)

describe('AssetValue', () => {
    const mockedUseAsset = jest.mocked(useAsset)

    test('renders fallback when registry is loading', async () => {
        mockedUseAsset.mockImplementationOnce(() => undefined)

        const { container } = render(
            <AssetValue amount={0} assetId="foo" fallback="bar" />
        )

        getByText(container, 'bar')
    })

    test('renders NA when an asset is null', async () => {
        mockedUseAsset.mockImplementationOnce(() => null)

        const { container } = render(<AssetValue amount={0} assetId="foo" />)

        getByText(container, 'NA')
    })

    test('applies CSS classes', async () => {
        // @ts-expect-error
        mockedUseAsset.mockImplementationOnce((id: string) => ({ symbol: id }))

        const { container } = render(
            <AssetValue amount={0} assetId="foo" className="foo bar" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
