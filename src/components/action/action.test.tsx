import { render } from '@testing-library/react'
import Action from './action'

describe('Action', () => {
    test('applies CSS classes', async () => {
        const { container } = render(
            <Action
                // @ts-expect-error
                action={{ actionView: { case: 'delegate' } }}
                className="foo bar"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
