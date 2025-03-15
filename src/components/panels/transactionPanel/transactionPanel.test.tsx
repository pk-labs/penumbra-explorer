import { getByText, render } from '@testing-library/react'
import { PanelProps } from '../panel'
import TransactionPanel from './transactionPanel'

jest.mock('../panel/panel', () => (props: PanelProps) => (
    <div>{props.className}</div>
))

describe('TransactionPanel', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<TransactionPanel className="foo bar" />)
        getByText(container, 'foo bar', { exact: false })
    })
})
