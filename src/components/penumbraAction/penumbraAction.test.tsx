/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render } from '@testing-library/react'
import PenumbraAction from './penumbraAction'

jest.mock('../../lib/hooks/useGetMetadata')

describe('PenumbraAction', () => {
    test('applies CSS classes', async () => {
        const { container } = render(
            <PenumbraAction
                // @ts-ignore
                action={{ actionView: { case: 'delegate' } }}
                className="foo bar"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
