import { render } from '@testing-library/react'
import Collapsible from './collapsible'

describe('Collapsible', () => {
    test('applies CSS classes', async () => {
        const { container } = render(
            <Collapsible className="foo bar" header="Foo" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
