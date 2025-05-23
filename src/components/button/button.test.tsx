import { getByText, render } from '@testing-library/react'
import Button from './button'

describe('Button', () => {
    test('renders as internal link', async () => {
        const { container } = render(
            <Button href="/foo" icon="Home">
                Foo
            </Button>
        )

        const button = getByText(container, 'Foo')

        expect(button.parentNode).toHaveAttribute('href', '/foo')
        expect(button.firstChild).toHaveClass('lucide-house')
    })

    test('renders as internal link', async () => {
        const { container } = render(
            <Button href="/foo" externalLink>
                Foo
            </Button>
        )

        const button = getByText(container, 'Foo')

        expect(button.parentNode).toHaveAttribute('href', '/foo')
        expect(button.firstChild).toHaveClass('lucide-external-link')
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
