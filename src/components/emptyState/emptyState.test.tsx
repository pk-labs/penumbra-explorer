import { getByText, render } from '@testing-library/react'
import EmptyState from './emptyState'

describe('Container', () => {
    test('renders title and children', async () => {
        const { container } = render(<EmptyState title="Foo">Bar</EmptyState>)

        getByText(container, 'Foo')
        getByText(container, 'Bar')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <EmptyState className="foo bar" title="Foo" />
        )
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
