import { getByText, render } from '@testing-library/react'
import AnimatedList from './animatedList'

describe('AnimatedList', () => {
    test('renders children', async () => {
        const { container } = render(<AnimatedList>Foo</AnimatedList>)
        getByText(container, 'Foo')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<AnimatedList className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo bar')
    })
})
