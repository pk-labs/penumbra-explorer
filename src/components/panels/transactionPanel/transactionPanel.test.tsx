import { getByText, render } from '@testing-library/react'
import TransactionPanel from './transactionPanel'

jest.mock('../numberPanel/numberPanel', () => (props: any) => (
    <div className={props.className}>{props.number}</div>
))

describe('TransactionPanel', () => {
    test('renders number', async () => {
        const { container } = render(<TransactionPanel number={99} />)
        getByText(container, 99)
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <TransactionPanel className="foo bar" number={0} />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
