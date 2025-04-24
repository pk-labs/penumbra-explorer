import { fireEvent, getByText, render } from '@testing-library/react'
import { router } from '@/lib/__tests__/__mocks__'
import dayjs from '@/lib/dayjs'
import { ActionType } from '@/lib/types'
import { TableProps } from '../table'
import TransactionTable from './transactionTable'

jest.mock('../table/table', () => (props: TableProps) => (
    <table className={props.className}>{props.children}</table>
))

jest.mock('../../copyToClipboard/copyToClipboard')

describe('BlockTable', () => {
    test('renders empty table', async () => {
        const { container, rerender } = render(<TransactionTable />)

        expect(container.querySelector('tbody tr td')).toHaveAttribute(
            'colspan',
            '2'
        )

        rerender(<TransactionTable blockHeight />)

        expect(container.querySelector('tbody tr td')).toHaveAttribute(
            'colspan',
            '3'
        )

        rerender(<TransactionTable blockHeight time />)

        expect(container.querySelector('tbody tr td')).toHaveAttribute(
            'colspan',
            '4'
        )
    })

    test('renders transactions', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actionCount: 0,
                        block: {
                            createdAt: dayjs().toISOString(),
                            height: 123,
                        },
                        hash: 'tx1',
                        raw: '',
                    },
                    {
                        actionCount: 0,
                        block: {
                            createdAt: dayjs().toISOString(),
                            height: 456,
                        },
                        hash: 'tx2',
                        raw: '',
                    },
                ]}
            />
        )

        getByText(container, 'tx1')
        getByText(container, 'tx2')
    })

    test('renders block height', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actionCount: 0,
                        block: {
                            createdAt: dayjs().toISOString(),
                            height: 123,
                        },
                        hash: 'tx1',
                        raw: '',
                    },
                ]}
                blockHeight
            />
        )

        getByText(container, 123)
    })

    test('renders status', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actionCount: 0,
                        block: {
                            createdAt: dayjs().toISOString(),
                            height: 123,
                        },
                        hash: 'tx1',
                        raw: '',
                    },
                ]}
                status
            />
        )

        getByText(container, 'Completed')
    })

    test('renders actions', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actionCount: 2,
                        block: {
                            createdAt: dayjs().toISOString(),
                            height: 123,
                        },
                        hash: 'tx1',
                        primaryAction: ActionType.receive,
                        raw: '',
                    },
                ]}
            />
        )

        getByText(container, 'receive')
        getByText(container, '+1')
    })

    test('renders time', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actionCount: 0,
                        block: {
                            createdAt: dayjs()
                                .subtract(1, 'second')
                                .toISOString(),
                            height: 123,
                        },
                        hash: 'tx1',
                        raw: '',
                        timeAgo: '1s ago',
                    },
                ]}
                time
            />
        )

        getByText(container, '1s ago')
    })

    test('navigates to transaction on row click', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actionCount: 0,
                        block: {
                            createdAt: dayjs().toISOString(),
                            height: 123,
                        },
                        hash: 'tx1',
                        raw: '',
                    },
                ]}
            />
        )

        const row = getByText(container, 'tx1').parentElement

        if (!row) {
            throw Error('Missing element')
        }

        fireEvent.click(row)
        expect(router.push).toHaveBeenCalledWith('/tx/tx1')
    })
})
