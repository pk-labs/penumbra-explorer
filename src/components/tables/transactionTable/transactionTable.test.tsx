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
        const { container, rerender } = render(<TransactionTable time />)

        expect(container.querySelector('tbody tr td')).toHaveAttribute(
            'colspan',
            '4'
        )

        rerender(<TransactionTable embedded time />)

        expect(container.querySelector('tbody tr td')).toHaveAttribute(
            'colspan',
            '3'
        )

        rerender(<TransactionTable />)

        expect(container.querySelector('tbody tr td')).toHaveAttribute(
            'colspan',
            '3'
        )

        rerender(<TransactionTable embedded />)

        expect(container.querySelector('tbody tr td')).toHaveAttribute(
            'colspan',
            '2'
        )
    })

    test('renders transactions', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actions: [],
                        block: {
                            createdAt: dayjs().toISOString(),
                            height: 123,
                        },
                        hash: 'tx1',
                        raw: '',
                    },
                    {
                        actions: [],
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

        getByText(container, 123)
        getByText(container, 456)
    })

    test('renders time', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actions: [],
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

    test('renders actions', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actions: [ActionType.receive, ActionType.send],
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

    test('renders embedded', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actions: [],
                        block: {
                            createdAt: dayjs().toISOString(),
                            height: 123,
                        },
                        hash: 'tx1',
                        raw: '',
                    },
                ]}
                embedded
            />
        )

        expect(container.firstChild).toHaveClass('p-0')
    })

    test('navigates to transaction on row click', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actions: [],
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

        const row = getByText(container, 123).parentElement

        if (!row) {
            throw Error('Missing element')
        }

        fireEvent.click(row)
        expect(router.push).toHaveBeenCalledWith('/tx/tx1')
    })
})
