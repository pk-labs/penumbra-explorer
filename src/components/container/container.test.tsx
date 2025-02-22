import { getByText, render } from '@testing-library/react'
import Container from './container'

describe('Container', () => {
    test('renders children', async () => {
        const { container } = render(<Container>Foo</Container>)
        getByText(container, 'Foo')
    })

    test('supports narrow layout', async () => {
        const { container } = render(<Container narrow>Foo</Container>)

        expect(getByText(container, 'Foo').classList.contains('narrow')).toBe(
            true
        )
    })

    test('applies custom classes', async () => {
        const { container } = render(<Container className="foo bar" />)

        expect(container.firstElementChild?.classList.contains('foo')).toBe(
            true
        )

        expect(container.firstElementChild?.classList.contains('bar')).toBe(
            true
        )
    })
})
