/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render } from '@testing-library/react'
import AssetValue from './assetValue'

jest.mock('../../lib/hooks/useGetMetadata')

describe('AssetValue', () => {
    test('applies CSS classes', async () => {
        const { container } = render(
            <AssetValue
                // @ts-ignore
                action={{ actionView: { case: 'delegate' } }}
                className="foo bar"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
