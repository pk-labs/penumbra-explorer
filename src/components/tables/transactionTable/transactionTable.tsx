'use client'

import { BoxIcon, CheckCheckIcon } from 'lucide-react'
import Link from 'next/link'
import { FC, useEffect, useRef } from 'react'
import {
    TransformedPartialTransactionFragment,
    TransformedTransactionUpdate,
} from '@/lib/types'
import { formatNumber, shortenHash } from '@/lib/utils'
import CopyToClipboard from '../../copyToClipboard'
import EmptyState from '../../emptyState'
import Pill from '../../pill'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    amount?: boolean
    blockHeight?: boolean
    emptyStateMessage?: string
    status?: boolean
    time?: boolean
    transactions?: Array<
        TransformedPartialTransactionFragment | TransformedTransactionUpdate
    >
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
                        <TableRow
                            key={transaction.hash}
                            className={
                                typeof prevTransactionsRef.current !==
                                    'undefined' &&
                                !prevTransactionsRef.current.some(
                                    prevTransaction =>
                                        prevTransaction.hash ===
                                        transaction.hash
                                )
                                    ? 'animate-new-data-bg'
                                    : undefined
                            }
                            href={`/tx/${transaction.hash}`}
                        >
                            <TableCell>
                                <CheckCheckIcon
                                    className="text-secondary-light"
                                    size={14}
                                />
                                <Link href={`/tx/${transaction.hash}`}>
                                    {shortenHash(transaction.hash)}
                                </Link>
                                <CopyToClipboard text={transaction.hash} />
                            </TableCell>
                            {props.blockHeight && (
                                <TableCell>
                                    <BoxIcon
                                        color="var(--color-text-secondary)"
                                        size={16}
                                    />
                                    <Link
                                        href={`/block/${transaction.block.height}`}
                                    >
                                        {formatNumber(transaction.block.height)}
                                    </Link>
                                </TableCell>
                            )}
                            {props.amount && (
                                <TableCell>
                                    {formatNumber(1234.56)} UM
                                </TableCell>
                            )}
                            {props.status && (
                                <TableCell>
                                    <Pill
                                        context="technical-success"
                                        priority="secondary"
                                    >
                                        Completed
                                    </Pill>
                                </TableCell>
                            )}
                            <TableCell>
                                {transaction.primaryAction && (
                                    <Pill context="technical-default">
                                        {transaction.primaryAction}
                                    </Pill>
                                )}
                                {transaction.actionCount > 1 && (
                                    <span className="text-text-secondary">
                                        +{transaction.actionCount - 1}
                                    </span>
                                )}
                            </TableCell>
                            {props.time && (
                                <TableCell>{transaction.timeAgo}</TableCell>
                            )}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={
                                2 +
                                (props.blockHeight ? 1 : 0) +
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
