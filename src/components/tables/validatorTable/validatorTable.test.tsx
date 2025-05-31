import { getByText, render } from '@testing-library/react'
import { TableProps } from '../table'
import ValidatorTable from './validatorTable'

jest.mock('../table/table', () => (props: TableProps) => (
    <table>{props.children}</table>
))

describe('ValidatorPerformanceTable', () => {
    test('renders empty state when no validators', async () => {
        const { container } = render(<ValidatorTable validators={[]} />)

        getByText(container, 'No validators found')
    })
})
