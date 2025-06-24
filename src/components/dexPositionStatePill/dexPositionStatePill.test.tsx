import { getByText, render } from '@testing-library/react'
import { LiquidityPositionState } from '@/lib/graphql/generated/types'
import DexPositionStatePill from './dexPositionStatePill'

describe('DexPositionStatePill', () => {
    test('renders nothing when unsupported or missing state', async () => {
        const { container } = render(<DexPositionStatePill />)
        expect(container.firstChild).toBeNull()
    })

    test('renders open state', async () => {
        const { container } = render(
            <DexPositionStatePill state={LiquidityPositionState.Open} />
        )

        getByText(container, 'Open')
    })

    test('renders executing state', async () => {
        const { container } = render(
            <DexPositionStatePill state={LiquidityPositionState.Executing} />
        )

        getByText(container, 'Executing')
    })

    test('renders withdrawn state', async () => {
        const { container } = render(
            <DexPositionStatePill state={LiquidityPositionState.Withdrawn} />
        )

        getByText(container, 'Withdrawn')
    })

    test('renders closed state', async () => {
        const { container } = render(
            <DexPositionStatePill state={LiquidityPositionState.Closed} />
        )

        getByText(container, 'Closed')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <DexPositionStatePill
                className="foo bar"
                state={LiquidityPositionState.Closed}
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
