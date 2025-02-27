import { fireEvent, getByText, render } from '@testing-library/react'
import { router } from '@/lib/__tests__/__mocks__'
import dayjs from '@/lib/dayjs'
import { TableProps } from '../table'
import TransactionTable from './transactionTable'

jest.mock('lucide-react', () => ({
    Box: jest.fn(),
    CheckCheck: jest.fn(),
}))

jest.mock('../table/table', () => (props: TableProps) => (
    <table className={props.className}>{props.children}</table>
))

jest.mock('../../copyToClipboard/copyToClipboard')

describe('BlockTable', () => {
    test('renders empty table', async () => {
        const { container, rerender } = render(<TransactionTable />)

        expect(container.querySelector('tbody tr td')).toHaveAttribute(
            'colspan',
            '3'
        )

        rerender(<TransactionTable time />)

        expect(container.querySelector('tbody tr td')).toHaveAttribute(
            'colspan',
            '4'
        )
    })

    test('renders transactions', async () => {
        const createdAt = dayjs().toISOString()

        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        block: {
                            createdAt,
                            height: 123,
                        },
                        body: {
                            actions: [],
                            actionsCount: 0,
                        },
                        hash: 'tx1',
                    },
                    {
                        block: {
                            createdAt,
                            height: 456,
                        },
                        body: {
                            actions: [],
                            actionsCount: 0,
                        },
                        hash: 'tx2',
                    },
                ]}
            />
        )

        getByText(container, 123)
        getByText(container, 456)
    })

    test('renders time', async () => {
        const createdAt = dayjs().subtract(1, 's').toISOString()

        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        block: {
                            createdAt,
                            height: 123,
                        },
                        body: {
                            actions: [],
                            actionsCount: 0,
                        },
                        hash: 'tx1',
                    },
                ]}
                time
            />
        )

        getByText(container, '1s ago')
    })

    test('renders actions', async () => {
        const createdAt = dayjs().toISOString()

        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        block: {
                            createdAt,
                            height: 123,
                        },
                        body: {
                            actions: [
                                { __typename: 'IbcRelay' },
                                { __typename: 'Spend' },
                            ],
                            actionsCount: 2,
                        },
                        hash: 'tx1',
                    },
                ]}
                time
            />
        )

        getByText(container, 'ibc relay')
        getByText(container, '+1')
    })

    test('navigates to transaction on row click', async () => {
        const createdAt = dayjs().toISOString()

        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        block: {
                            createdAt,
                            height: 123,
                        },
                        body: {
                            actions: [],
                            actionsCount: 0,
                        },
                        hash: 'tx1',
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

    test('renders embedded', async () => {
        const { container } = render(<TransactionTable embedded />)
        expect(container.firstChild).toHaveClass('embedded')
    })
})
