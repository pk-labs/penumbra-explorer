import { getByAltText, render } from '@testing-library/react'
import ClientImage from './clientImage'

describe('ClientImage', () => {
    test('renders image', async () => {
        const { container } = render(<ClientImage alt="Foo" src="foo.jpg" />)
        expect(getByAltText(container, 'Foo')).toHaveAttribute('src', 'foo.jpg')
    })

    test('renders placeholder when no image', async () => {
        const { container } = render(<ClientImage />)
        expect(container.firstChild).toHaveClass('bg-neutral-700')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <ClientImage alt="Foo" className="foo bar" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
