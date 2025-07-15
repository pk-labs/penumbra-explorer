import { getByText, render } from '@testing-library/react'
import { VotingState } from '@/lib/types'
import VotingStatePill from './votingStatePill'

describe('VotingStatePill', () => {
    test('renders nothing when unsupported or missing state', async () => {
        const { container } = render(<VotingStatePill />)
        expect(container.firstChild).toBeNull()
    })

    test('renders claimed state', async () => {
        const { container } = render(
            <VotingStatePill state={VotingState.Passed} />
        )

        getByText(container, 'Passed')
    })

    test('renders voting state', async () => {
        const { container } = render(
            <VotingStatePill state={VotingState.InProgress} />
        )

        getByText(container, 'Voting in progress')
    })

    test('renders failed state', async () => {
        const { container } = render(
            <VotingStatePill state={VotingState.Failed} />
        )

        getByText(container, 'Failed')
    })

    test('renders slashed state', async () => {
        const { container } = render(
            <VotingStatePill state={VotingState.Slashed} />
        )

        getByText(container, 'Slashed')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <VotingStatePill className="foo bar" state={VotingState.Passed} />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
