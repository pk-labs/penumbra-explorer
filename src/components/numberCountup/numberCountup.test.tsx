import { act, getByText, render } from '@testing-library/react'
import NumberCountup from './numberCountup'

describe('Container', () => {
    test('renders 0 initially', async () => {
        const { container } = render(<NumberCountup number={99} />)
        getByText(container, '0')
    })

    test('renders prefix', async () => {
        const { container } = render(<NumberCountup number={99} prefix="$" />)
        expect(container.firstChild).toHaveTextContent('$0')
    })

    test('renders suffix', async () => {
        const { container } = render(<NumberCountup number={99} suffix=" UM" />)
        expect(container.firstChild).toHaveTextContent('0 UM')
    })

    test.skip('renders final number at animation end', async () => {
        const { container } = render(<NumberCountup number={99} />)

        act(() => jest.advanceTimersByTime(1000))
        getByText(container, '99')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <NumberCountup className="foo bar" number={99} />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
