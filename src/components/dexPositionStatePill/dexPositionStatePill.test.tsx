import { getByText, render } from '@testing-library/react'
import { DexPositionState } from '@/lib/types'
import DexPositionStatePill from './dexPositionStatePill'

describe('DexPositionStatePill', () => {
    test('renders nothing when unsupported or missing state', async () => {
        const { container } = render(<DexPositionStatePill />)
        expect(container.firstChild).toBeNull()
    })

    test('renders open state', async () => {
        const { container } = render(
            <DexPositionStatePill state={DexPositionState.Open} />
        )

        getByText(container, DexPositionState.Open)
    })

    test('renders executing state', async () => {
        const { container } = render(
            <DexPositionStatePill state={DexPositionState.Executing} />
        )

        getByText(container, DexPositionState.Executing)
    })

    test('renders withdrawn state', async () => {
        const { container } = render(
            <DexPositionStatePill state={DexPositionState.Withdrawn} />
        )

        getByText(container, DexPositionState.Withdrawn)
    })

    test('renders closed state', async () => {
        const { container } = render(
            <DexPositionStatePill state={DexPositionState.Closed} />
        )

        getByText(container, DexPositionState.Closed)
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <DexPositionStatePill
                className="foo bar"
                state={DexPositionState.Closed}
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
