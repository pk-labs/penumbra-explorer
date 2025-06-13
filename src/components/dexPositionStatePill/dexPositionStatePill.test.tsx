import { getByText, render } from '@testing-library/react'
import DexPositionStatePill from './dexPositionStatePill'

describe('DexPositionStatePill', () => {
    test('renders nothing when unsupported or missing state', async () => {
        const { container } = render(<DexPositionStatePill />)
        expect(container.firstChild).toBeNull()
    })

    test('renders open state', async () => {
        const { container } = render(<DexPositionStatePill state="open" />)
        getByText(container, 'Open')
    })

    test('renders executing state', async () => {
        const { container } = render(<DexPositionStatePill state="executing" />)
        getByText(container, 'Executing')
    })

    test('renders withdrawn state', async () => {
        const { container } = render(<DexPositionStatePill state="withdrawn" />)
        getByText(container, 'Withdrawn')
    })

    test('renders closed state', async () => {
        const { container } = render(<DexPositionStatePill state="closed" />)
        getByText(container, 'Closed')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <DexPositionStatePill className="foo bar" state="closed" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
