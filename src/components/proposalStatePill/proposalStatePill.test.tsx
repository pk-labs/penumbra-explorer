import { getByText, render } from '@testing-library/react'
import { ProposalState } from '@/lib/types'
import ProposalStatePill from './proposalStatePill'

describe('ProposalStatePill', () => {
    test('renders nothing when unsupported or missing state', async () => {
        const { container } = render(<ProposalStatePill />)
        expect(container.firstChild).toBeNull()
    })

    test('renders claimed state', async () => {
        const { container } = render(
            <ProposalStatePill state={ProposalState.Claimed} />
        )

        getByText(container, 'Claimed')
    })

    test('renders voting state', async () => {
        const { container } = render(
            <ProposalStatePill state={ProposalState.Voting} />
        )

        getByText(container, 'Voting')
    })

    test('renders withdrawn state', async () => {
        const { container } = render(
            <ProposalStatePill state={ProposalState.Withdrawn} />
        )

        getByText(container, 'Withdrawn')
    })

    test('renders finished state', async () => {
        const { container } = render(
            <ProposalStatePill state={ProposalState.Finished} />
        )

        getByText(container, 'Finished')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <ProposalStatePill
                className="foo bar"
                state={ProposalState.Finished}
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
