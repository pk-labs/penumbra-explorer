import { getByText, render } from '@testing-library/react'
import { IbcStatus } from '@/lib/graphql/generated/types'
import TransactionStatusPill from './transactionStatusPill'

describe('TransactionStatusPill', () => {
    test('renders unknown status by default', async () => {
        const { container } = render(<TransactionStatusPill />)
        getByText(container, 'Unknown')
    })

    test('renders pending status', async () => {
        const { container } = render(
            <TransactionStatusPill status={IbcStatus.Completed} />
        )

        getByText(container, 'Completed')
    })

    test('renders pending status', async () => {
        const { container } = render(
            <TransactionStatusPill status={IbcStatus.Pending} />
        )

        getByText(container, 'Pending')
    })

    test('renders expired status', async () => {
        const { container } = render(
            <TransactionStatusPill status={IbcStatus.Expired} />
        )

        getByText(container, 'Expired')
    })

    test('renders error status', async () => {
        const { container } = render(
            <TransactionStatusPill status={IbcStatus.Error} />
        )

        getByText(container, 'Error')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <TransactionStatusPill className="foo bar" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
