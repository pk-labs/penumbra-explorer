/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render } from '@testing-library/react'
import PenumbraValue from './penumbraValue'

jest.mock('../../lib/hooks/useGetMetadata')

describe('PenumbraValue', () => {
    test('applies CSS classes', async () => {
        const { container } = render(
            <PenumbraValue
                // @ts-ignore
                action={{ actionView: { case: 'delegate' } }}
                className="foo bar"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
