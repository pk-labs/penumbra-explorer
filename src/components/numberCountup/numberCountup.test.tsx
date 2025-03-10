import { act, getByText, render } from '@testing-library/react'
import NumberCountup from './numberCountup'

describe('Container', () => {
    test('renders 0 initially', async () => {
        const { container } = render(<NumberCountup number={99} />)
        getByText(container, '0')
    })

    test('renders suffix', async () => {
        const { container } = render(<NumberCountup number={99} suffix="$" />)
        getByText(container, '0$')
    })

    test.skip('renders final number at animation end', async () => {
        const { container } = render(<NumberCountup number={99} />)

        act(() => {
            jest.advanceTimersByTime(1000)
        })

        getByText(container, '99')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <NumberCountup className="foo bar" number={99} />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
