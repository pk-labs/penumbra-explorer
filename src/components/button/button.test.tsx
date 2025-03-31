import { getByText, render } from '@testing-library/react'
import Button from './button'

describe('Button', () => {
    test('renders as link when href set', async () => {
        const { container } = render(<Button href="/foo">Foo</Button>)

        expect(getByText(container, 'Foo').parentNode).toHaveAttribute(
            'href',
            '/foo'
        )
    })

    test('renders icon', async () => {
        const { container } = render(<Button icon="Home">Foo</Button>)

        expect(getByText(container, 'Foo').firstChild).toHaveClass(
            'lucide-house'
        )
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Button className="foo bar">Foo</Button>)
        expect(getByText(container, 'Foo').parentNode).toHaveClass('foo', 'bar')
    })
})
