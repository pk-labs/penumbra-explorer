import { getByText, render } from '@testing-library/react'
import Pill from './pill'

describe('Pill', () => {
    test('renders children', async () => {
        const { container } = render(<Pill>Foo</Pill>)
        getByText(container, 'Foo')
    })

    test('applies custom classes', async () => {
        const { container } = render(<Pill className="foo bar">Foo</Pill>)
        expect(getByText(container, 'Foo')).toHaveClass('foo', 'bar')
    })
})
