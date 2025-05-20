import { fireEvent, getByText, render } from '@testing-library/react'
import { router } from '@/lib/__tests__/__mocks__'
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
        const { container } = render(
            <BlockTable
                blocks={[
                    {
                        height: 456,
                        initialTimeAgo: '',
                        timestamp: 0,
                        transactionsCount: 99,
                    },
                    {
                        height: 123,
                        initialTimeAgo: '',
                        timestamp: 0,
                        transactionsCount: 98,
                    },
                ]}
            />
        )

        expect(getByText(container, 456).closest('tr')).toHaveTextContent('99')
        expect(getByText(container, 123).closest('tr')).toHaveTextContent('98')
    })

    test('highlights new blocks', async () => {
        const { container, rerender } = render(
            <BlockTable
                blocks={[
                    {
                        height: 2,
                        initialTimeAgo: '',
                        timestamp: 0,
                        transactionsCount: 0,
                    },
                    {
                        height: 1,
                        initialTimeAgo: '',
                        timestamp: 0,
                        transactionsCount: 0,
                    },
                ]}
            />
        )

        expect(getByText(container, 2).closest('tr')).not.toHaveClass(
            'animate-new-data-bg'
        )

        expect(getByText(container, 1).closest('tr')).not.toHaveClass(
            'animate-new-data-bg'
        )

        rerender(
            <BlockTable
                blocks={[
                    {
                        height: 3,
                        initialTimeAgo: '',
                        timestamp: 0,
                        transactionsCount: 0,
                    },
                    {
                        height: 2,
                        initialTimeAgo: '',
                        timestamp: 0,
                        transactionsCount: 0,
                    },
                    {
                        height: 1,
                        initialTimeAgo: '',
                        timestamp: 0,
                        transactionsCount: 0,
                    },
                ]}
            />
        )

        expect(getByText(container, 3).closest('tr')).toHaveClass(
            'animate-new-data-bg'
        )

        expect(getByText(container, 2).closest('tr')).not.toHaveClass(
            'animate-new-data-bg'
        )

        expect(getByText(container, 1).closest('tr')).not.toHaveClass(
            'animate-new-data-bg'
        )
    })

    test('renders proposer', async () => {
        const { container } = render(
            <BlockTable
                blocks={[
                    {
                        height: 123,
                        initialTimeAgo: '',
                        timestamp: 0,
                        transactionsCount: 0,
                    },
                ]}
                proposer
            />
        )

        expect(container.querySelectorAll('tbody tr td')).toHaveLength(4)
    })

    test('navigates to block on row click', async () => {
        const { container } = render(
            <BlockTable
                blocks={[
                    {
                        height: 123,
                        initialTimeAgo: '',
                        timestamp: 0,
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
