import { getByText, render } from '@testing-library/react'
import Button from './button'

describe('Button', () => {
    test('renders default button', async () => {
        const { container } = render(<Button>Foo</Button>)
        getByText(container, 'Foo')
    })

    test('renders light button', async () => {
        const { container } = render(<Button light>Foo</Button>)

        expect(getByText(container, 'Foo').classList.contains('light')).toBe(
            true
        )
    })

    test('renders link button', async () => {
        const { container } = render(<Button href="/foo">Foo</Button>)
        expect(getByText(container, 'Foo')).toHaveAttribute('href', '/foo')
    })

    test('applies custom classes', async () => {
        const { container } = render(<Button className="foo">Foo</Button>)
        expect(getByText(container, 'Foo').classList.contains('foo')).toBe(true)
    })
})
