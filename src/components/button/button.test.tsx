import { getByText, render } from '@testing-library/react'
import Button from './button'

describe('Button', () => {
    test('renders default button', async () => {
        const { container } = render(<Button>Foo</Button>)
        getByText(container, 'Foo')
    })

    test('renders light button', async () => {
        const { container } = render(<Button light>Foo</Button>)
        expect(getByText(container, 'Foo')).toHaveClass('light')
    })

    test('renders link button', async () => {
        const { container } = render(<Button href="/foo">Foo</Button>)
        expect(getByText(container, 'Foo')).toHaveAttribute('href', '/foo')
    })

    test('renders disabled button', async () => {
        const { container, rerender } = render(<Button disabled>Foo</Button>)

        const button = getByText(container, 'Foo')
        expect(button).toBeDisabled()
        expect(button).toHaveClass('disabled')

        rerender(
            <Button href="/" disabled>
                Foo
            </Button>
        )

        expect(button).toHaveClass('disabled')
    })

    test('applies custom classes', async () => {
        const { container } = render(<Button className="foo bar">Foo</Button>)
        expect(getByText(container, 'Foo')).toHaveClass('foo', 'bar')
    })
})
