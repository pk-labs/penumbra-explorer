import { getByText, render } from '@testing-library/react'
import Container from './container'

describe('Container', () => {
    test('renders children', async () => {
        const { container } = render(<Container>Foo</Container>)

        expect(getByText(container, 'Foo')).toHaveClass(
            'max-w-(--pageMaxWidth)'
        )
    })

    test('supports narrow layout', async () => {
        const { container } = render(<Container narrow>Foo</Container>)
        expect(container.firstChild).toHaveClass('max-w-(--pageNarrowWidth)')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Container className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
