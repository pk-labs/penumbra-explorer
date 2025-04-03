import { getByText, render } from '@testing-library/react'
import EmptyState from './emptyState'

describe('Container', () => {
    test('renders title', async () => {
        const { container } = render(<EmptyState title="Foo" />)
        getByText(container, 'Foo')
    })

    test('renders children', async () => {
        const { container } = render(<EmptyState>Bar</EmptyState>)
        getByText(container, 'Bar')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<EmptyState className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
