import { getByText, render } from '@testing-library/react'
import { TableProps } from '../table'
import IbcTable from './ibcTable'

jest.mock('../table/table', () => (props: TableProps) => (
    <table>{props.children}</table>
))

describe('IbcTable', () => {
    test('renders empty state when no clients', async () => {
        const { container } = render(<IbcTable stats={[]} />)
        getByText(container, 'No clients found')
    })
})
