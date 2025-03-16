import { fireEvent, getByText, render } from '@testing-library/react'
import { router } from '@/lib/__tests__/__mocks__'
import dayjs from '@/lib/dayjs'
import { TableProps } from '../table'
import BlockTable from './blockTable'

jest.mock('../table/table', () => (props: TableProps) => (
    <table>{props.children}</table>
))

describe('BlockTable', () => {
    test('renders empty table', async () => {
        const { container, rerender } = render(<BlockTable />)

        expect(container.querySelector('tbody tr td')).toHaveAttribute(
            'colspan',
            '3'
        )

        rerender(<BlockTable proposer />)

        expect(container.querySelector('tbody tr td')).toHaveAttribute(
            'colspan',
            '4'
        )
    })

    test('renders blocks', async () => {
        const createdAt = dayjs('2025-01-01').toISOString()

        const { container } = render(
            <BlockTable
                blocks={[
                    {
                        createdAt,
                        height: 123,
                        transactionsCount: 98,
                    },
                    {
                        createdAt,
                        height: 456,
                        transactionsCount: 99,
                    },
                ]}
            />
        )

        expect(getByText(container, 123).closest('tr')).toHaveTextContent('98')
        expect(getByText(container, 456).closest('tr')).toHaveTextContent('99')
    })

    test('renders proposer', async () => {
        const createdAt = dayjs('2025-01-01').toISOString()

        const { container } = render(
            <BlockTable
                blocks={[
                    {
                        createdAt,
                        height: 123,
                        transactionsCount: 0,
                    },
                ]}
                proposer
            />
        )

        expect(container.querySelectorAll('tbody tr td')).toHaveLength(4)
    })

    test('navigates to block on row click', async () => {
        const createdAt = dayjs('2025-01-01').toISOString()

        const { container } = render(
            <BlockTable
                blocks={[
                    {
                        createdAt,
                        height: 123,
                        transactionsCount: 0,
                    },
                ]}
                proposer
            />
        )

        const row = getByText(container, 123).parentElement

        if (!row) {
            throw Error('Missing element')
        }

        fireEvent.click(row)
        expect(router.push).toHaveBeenCalledWith('/block/123')
    })
})
