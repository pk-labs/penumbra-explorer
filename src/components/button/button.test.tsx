import { getByText, render } from '@testing-library/react'
import Button from './button'

describe('Button', () => {
    test('renders internal link', async () => {
        const { container } = render(
            <Button href="/foo" icon="Home" scroll={false}>
                Foo
            </Button>
        )

        const button = getByText(container, 'Foo')

        expect(button.parentNode).toHaveAttribute('href', '/foo')
        expect(button.firstChild).toHaveClass('lucide-house')
    })

    test('renders external link', async () => {
        const { container } = render(
            <Button href="https://foo.com/">Foo</Button>
        )

        const button = getByText(container, 'Foo')

        expect(button.parentNode).toHaveAttribute('href', 'https://foo.com/')
        expect(button.firstChild).toHaveClass('lucide-external-link')
    })

    test('renders icon', async () => {
        const { container } = render(<Button icon="Home">Foo</Button>)

        expect(getByText(container, 'Foo').firstChild).toHaveClass(
            'lucide-house'
        )
    })

    test('renders at full width', async () => {
        const { container } = render(<Button fullWidth>Foo</Button>)
        expect(container.firstChild).toHaveClass('fullWidth')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Button className="foo bar">Foo</Button>)
        expect(getByText(container, 'Foo').parentNode).toHaveClass('foo', 'bar')
    })
})
