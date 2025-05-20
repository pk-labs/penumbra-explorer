import { render } from '@testing-library/react'
import AssetValue from './assetValue'

describe('AssetValue', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<AssetValue className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
