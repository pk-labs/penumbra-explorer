import { getByText, render } from '@testing-library/react'
import { TableProps } from '../table'
import ProposalTable from './proposalTable'

jest.mock('../table/table', () => (props: TableProps) => (
    <table>{props.children}</table>
))

describe('ProposalTable', () => {
    test('renders empty state when no proposals', async () => {
        const { container } = render(<ProposalTable proposals={[]} />)
        getByText(container, 'No proposals found')
    })
})
