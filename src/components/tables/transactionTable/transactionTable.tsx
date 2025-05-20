'use client'

import { FC, useEffect, useRef } from 'react'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import EmptyState from '../../emptyState'
import { Table, TableCell, TableProps, TableRow } from '../table'
import TransactionTableRow, {
    Props as TransationTableRowProps,
} from './transactionTableRow'

export interface Props
    extends Omit<TableProps, 'children'>,
        Omit<TransationTableRowProps, 'new' | 'transaction'> {
    emptyStateMessage?: string
    transactions?: TransformedPartialTransactionFragment[]
}

const TransactionTable: FC<Props> = props => {
    const prevTransactionsRef = useRef<typeof props.transactions>(undefined)

    useEffect(() => {
        prevTransactionsRef.current = props.transactions
    }, [props.transactions])

    return (
        <Table
            className={props.className}
            footer={props.footer}
            header={props.header}
        >
            <thead>
                <TableRow>
                    <TableCell header>Tx hash</TableCell>
                    {props.blockHeight && (
                        <TableCell header>Block height</TableCell>
                    )}
                    {props.amount && <TableCell header>Amount</TableCell>}
                    {props.status && <TableCell header>Tx status</TableCell>}
                    <TableCell header>Actions</TableCell>
                    {props.time && <TableCell header>Time</TableCell>}
                </TableRow>
            </thead>
            <tbody>
                {props.transactions?.length ? (
                    props.transactions.map(transaction => (
                        <TransactionTableRow
                            key={transaction.hash}
                            amount={props.amount}
                            blockHeight={props.blockHeight}
                            new={
                                typeof prevTransactionsRef.current !==
                                    'undefined' &&
                                !prevTransactionsRef.current.some(
                                    prevTransaction =>
                                        prevTransaction.hash ===
                                        transaction.hash
                                )
                            }
                            status={props.status}
                            ticker={props.ticker}
                            time={props.time}
                            transaction={transaction}
                        />
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={
                                2 +
                                (props.blockHeight ? 1 : 0) +
                                (props.amount ? 1 : 0) +
                                (props.status ? 1 : 0) +
                                (props.time ? 1 : 0)
                            }
                        >
                            <EmptyState>{props.emptyStateMessage}</EmptyState>
                        </TableCell>
                    </TableRow>
                )}
            </tbody>
        </Table>
    )
}

export default TransactionTable
