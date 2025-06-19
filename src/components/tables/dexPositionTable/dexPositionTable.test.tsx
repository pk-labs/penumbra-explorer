import { getByText, render } from '@testing-library/react'
import { TableProps } from '../table'
import DexPositionTable from './dexPositionTable'

jest.mock('../table/table', () => (props: TableProps) => (
    <table>{props.children}</table>
))

describe('DexPositionTable', () => {
    test('renders empty state when no positions', async () => {
        const { container } = render(<DexPositionTable positions={[]} />)
        getByText(container, 'No positions found')
    })
})
