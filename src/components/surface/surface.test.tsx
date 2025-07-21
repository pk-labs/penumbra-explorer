import { getByText, render } from '@testing-library/react'
import Surface from './surface'

describe('Surface', () => {
    test('renders children', async () => {
        const { container } = render(<Surface>Foo</Surface>)
        getByText(container, 'Foo')
    })

    test('supports custom element', async () => {
        const { container } = render(<Surface as="section">Foo</Surface>)

        expect(getByText(container, 'Foo').tagName.toLowerCase()).toBe(
            'section'
        )
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Surface className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
