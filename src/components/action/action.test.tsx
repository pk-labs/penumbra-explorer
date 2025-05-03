/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render } from '@testing-library/react'
import Action from './action'

describe('Action', () => {
    test('applies CSS classes', async () => {
        const { container } = render(
            <Action
                // @ts-ignore
                action={{ actionView: { case: 'delegate' } }}
                className="foo bar"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
