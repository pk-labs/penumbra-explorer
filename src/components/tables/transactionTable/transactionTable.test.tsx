import { fireEvent, getByText, render } from '@testing-library/react'
import { router } from '@/lib/__tests__/__mocks__'
import dayjs from '@/lib/dayjs'
import { IbcStatus } from '@/lib/graphql/generated/types'
import { ActionType } from '@/lib/types'
import { TableProps } from '../table'
import TransactionTable from './transactionTable'

jest.mock('../table/table', () => (props: TableProps) => (
    <table className={props.className}>{props.children}</table>
))

jest.mock('../../copyToClipboard/copyToClipboard')

jest.mock(
    '../../../lib/utils/decodeTransaction/decodeTransaction',
    () => () => ({
        body: {
            actions: [
                {
                    action: {
                        case: 'ics20Withdrawal',
                        value: '1,234.56 UM',
                    },
                },
            ],
        },
    })
)

jest.mock('../../assetValue/assetValue', () => (props: any) => (
    <div>{props.valueView}</div>
))

describe('TransactionTable', () => {
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
                        blockHeight: 123,
                        hash: 'tx1',
                        raw: '',
                        status: IbcStatus.Unknown,
                        timestamp: 0,
                    },
                    {
                        actionCount: 0,
                        blockHeight: 456,
                        hash: 'tx2',
                        raw: '',
                        status: IbcStatus.Unknown,
                        timestamp: 0,
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
                        blockHeight: 123,
                        hash: 'tx1',
                        raw: '',
                        status: IbcStatus.Unknown,
                        timestamp: 0,
                    },
                ]}
                blockHeight
            />
        )

        getByText(container, 123)
    })

    test.skip('renders amount', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actionCount: 0,
                        blockHeight: 123,
                        hash: 'tx1',
                        raw: '',
                        status: IbcStatus.Unknown,
                        timestamp: 0,
                    },
                ]}
                amount
            />
        )

        getByText(container, '1,234.56 UM')
    })

    test('renders status', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actionCount: 0,
                        blockHeight: 123,
                        hash: 'tx1',
                        raw: '',
                        status: IbcStatus.Completed,
                        timestamp: 0,
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
                        blockHeight: 123,
                        hash: 'tx1',
                        primaryAction: ActionType.Receive,
                        raw: '',
                        status: IbcStatus.Unknown,
                        timestamp: 0,
                    },
                ]}
            />
        )

        getByText(container, 'Receive')
        getByText(container, '+1')
    })

    test('renders time', async () => {
        const { container } = render(
            <TransactionTable
                transactions={[
                    {
                        actionCount: 0,
                        blockHeight: 123,
                        hash: 'tx1',
                        raw: '',
                        status: IbcStatus.Unknown,
                        timestamp: dayjs().subtract(1, 'second').valueOf(),
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
                        blockHeight: 123,
                        hash: 'tx1',
                        raw: '',
                        status: IbcStatus.Unknown,
                        timestamp: 0,
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
