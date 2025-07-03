import { getByText, render } from '@testing-library/react'
import { ProposalOutcome } from '@/lib/types'
import ProposalOutcomePill from './proposalOutcomePill'

describe('ProposalOutcomePill', () => {
    test('renders nothing when unsupported or missing outcome', async () => {
        const { container } = render(<ProposalOutcomePill />)
        expect(container.firstChild).toBeNull()
    })

    test('renders passed outcome', async () => {
        const { container } = render(
            <ProposalOutcomePill outcome={ProposalOutcome.Passed} />
        )

        getByText(container, 'Passed')
    })

    test('renders failed outcome', async () => {
        const { container } = render(
            <ProposalOutcomePill outcome={ProposalOutcome.Failed} />
        )

        getByText(container, 'Failed')
    })

    test('renders slashed outcome', async () => {
        const { container } = render(
            <ProposalOutcomePill outcome={ProposalOutcome.Slashed} />
        )

        getByText(container, 'Slashed')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <ProposalOutcomePill
                className="foo bar"
                outcome={ProposalOutcome.Passed}
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
