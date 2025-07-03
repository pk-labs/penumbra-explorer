import { getByText, render } from '@testing-library/react'
import { ProposalState } from '@/lib/types'
import ProposalPanel from './proposalPanel'

describe('ProposalPanel', () => {
    test('renders title, description and state', async () => {
        const { container } = render(
            <ProposalPanel
                description="Bar"
                state={ProposalState.Voting}
                title="Foo"
            />
        )

        getByText(container, 'Foo')
        getByText(container, 'Bar')
        getByText(container, 'Voting')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <ProposalPanel
                className="foo bar"
                description="Bar"
                state={ProposalState.Voting}
                title="Foo"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
