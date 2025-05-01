import { getByText, render } from '@testing-library/react'
import { IbcStatus } from '@/lib/graphql/generated/types'
import StatusIcon from './statusIcon'

jest.mock('lucide-react', () => ({
    CheckCheckIcon: (props: any) => (
        <div className={props.className} data-size={props.size}>
            CheckCheckIcon
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

describe('StatusIcon', () => {
    test('renders completed status by default', async () => {
        const { container } = render(<StatusIcon />)
        getByText(container, 'CheckCheckIcon')
    })

    test('renders pending status', async () => {
        const { container } = render(<StatusIcon status={IbcStatus.Pending} />)
        getByText(container, 'Clock4Icon')
    })

    test('renders expired status', async () => {
        const { container } = render(<StatusIcon status={IbcStatus.Expired} />)
        getByText(container, 'TimerOffIcon')
    })

    test('renders error status', async () => {
        const { container } = render(<StatusIcon status={IbcStatus.Error} />)
        getByText(container, 'CircleXIcon')
    })

    test('renders unknown status as completed', async () => {
        const { container } = render(<StatusIcon status={IbcStatus.Unknown} />)
        getByText(container, 'CheckCheckIcon')
    })

    test('has default size', async () => {
        const { container } = render(<StatusIcon />)
        expect(container.firstChild).toHaveAttribute('data-size', '14')
    })

    test('has custom size', async () => {
        const { container } = render(<StatusIcon size={9} />)
        expect(container.firstChild).toHaveAttribute('data-size', '9')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<StatusIcon className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
