/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render } from '@testing-library/react'
import ActionView from './actionView'

jest.mock('../../lib/hooks/useGetMetadata')

describe('ActionView', () => {
    test('applies CSS classes', async () => {
        const { container } = render(
            <ActionView
                // @ts-ignore
                action={{ actionView: { case: 'delegate' } }}
                className="foo bar"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
