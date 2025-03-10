import { getByText, render } from '@testing-library/react'
import Container from './container'

describe('Container', () => {
    test('renders children', async () => {
        const { container } = render(<Container>Foo</Container>)
        getByText(container, 'Foo')
    })

    test('supports narrow layout', async () => {
        const { container } = render(<Container narrow>Foo</Container>)
        expect(container.firstChild).toHaveClass('narrow')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Container className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
