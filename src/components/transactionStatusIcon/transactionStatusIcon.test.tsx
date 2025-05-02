import { getByText, render } from '@testing-library/react'
import { IbcStatus } from '@/lib/graphql/generated/types'
import TransactionStatusIcon from './transactionStatusIcon'

jest.mock('lucide-react', () => ({
    CheckCheckIcon: (props: any) => (
        <div className={props.className} data-size={props.size}>
            CheckCheckIcon
        </div>
    ),
    CircleHelpIcon: (props: any) => (
        <div className={props.className} data-size={props.size}>
            CircleHelpIcon
        </div>
    ),
    CircleXIcon: (props: any) => (
        <div className={props.className} data-size={props.size}>
            CircleXIcon
        </div>
    ),
    Clock4Icon: (props: any) => (
        <div className={props.className} data-size={props.size}>
            Clock4Icon
        </div>
    ),
    TimerOffIcon: (props: any) => (
        <div className={props.className} data-size={props.size}>
            TimerOffIcon
        </div>
    ),
}))

describe('TransactionStatusIcon', () => {
    test('renders unknown status by default', async () => {
        const { container } = render(<TransactionStatusIcon />)
        getByText(container, 'CircleHelpIcon')
    })

    test('renders completed status', async () => {
        const { container } = render(
            <TransactionStatusIcon status={IbcStatus.Completed} />
        )

        getByText(container, 'CheckCheckIcon')
    })

    test('renders pending status', async () => {
        const { container } = render(
            <TransactionStatusIcon status={IbcStatus.Pending} />
        )

        getByText(container, 'Clock4Icon')
    })

    test('renders expired status', async () => {
        const { container } = render(
            <TransactionStatusIcon status={IbcStatus.Expired} />
        )

        getByText(container, 'TimerOffIcon')
    })

    test('renders error status', async () => {
        const { container } = render(
            <TransactionStatusIcon status={IbcStatus.Error} />
        )

        getByText(container, 'CircleXIcon')
    })

    test('has default size', async () => {
        const { container } = render(<TransactionStatusIcon />)
        expect(container.firstChild).toHaveAttribute('data-size', '14')
    })

    test('has custom size', async () => {
        const { container } = render(<TransactionStatusIcon size={9} />)
        expect(container.firstChild).toHaveAttribute('data-size', '9')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <TransactionStatusIcon className="foo bar" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
