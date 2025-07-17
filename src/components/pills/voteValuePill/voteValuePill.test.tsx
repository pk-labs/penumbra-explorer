import { getByText, render } from '@testing-library/react'
import { VoteValue } from '@/lib/graphql/generated/types'
import VoteValuePill from './voteValuePill'

describe('VoteValuePill', () => {
    test('renders nothing when unsupported or missing value', async () => {
        const { container } = render(<VoteValuePill />)
        expect(container.firstChild).toBeNull()
    })

    test('renders yes value', async () => {
        const { container } = render(<VoteValuePill value={VoteValue.Yes} />)
        getByText(container, 'Yes')
    })

    test('renders no value', async () => {
        const { container } = render(<VoteValuePill value={VoteValue.No} />)
        getByText(container, 'No')
    })

    test('renders abstain value', async () => {
        const { container } = render(
            <VoteValuePill value={VoteValue.Abstain} />
        )

        getByText(container, 'Abstain')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <VoteValuePill className="foo bar" value={VoteValue.Yes} />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
