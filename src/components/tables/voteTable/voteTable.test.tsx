import { getByText, render } from '@testing-library/react'
import { TableProps } from '../table'
import VoteTable from './voteTable'

jest.mock('../table/table', () => (props: TableProps) => (
    <table>{props.children}</table>
))

describe('VoteTable', () => {
    test('renders empty state when no votes', async () => {
        const { container } = render(<VoteTable votes={[]} />)
        getByText(container, 'No votes found')
    })
})
