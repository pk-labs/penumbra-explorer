import { getByAltText, getByText, render } from '@testing-library/react'
import Avatar from './avatar'

describe('Avatar', () => {
    test('renders image', async () => {
        const { container } = render(<Avatar alt="Foo" src="foo.jpg" />)
        expect(getByAltText(container, 'Foo')).toHaveAttribute('src', 'foo.jpg')
    })

    test('renders fallback image', async () => {
        const { container } = render(<Avatar alt="Foo" fallback="bar.jpg" />)
        expect(getByAltText(container, 'Foo')).toHaveAttribute('src', 'bar.jpg')
    })

    test('renders fallback letter', async () => {
        const { container } = render(
            <Avatar alt="Bar" fallback="bar.jpg" fallbackLetter />
        )

        getByText(container, 'B')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <Avatar alt="Foo" className="foo bar" src="foo.jpg" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
