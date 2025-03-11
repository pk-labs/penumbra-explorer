'use client'

import clsx from 'clsx'
import { Box, CheckCheck } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, useCallback } from 'react'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import { formatAction, formatNumber, shortenHash } from '@/lib/utils'
import CopyToClipboard from '../../copyToClipboard'
import EmptyState from '../../emptyState'
import Pill from '../../pill'
import { Table, TableProps } from '../table'
import styles from './transactionTable.module.css'

interface Props extends Pick<TableProps, 'actions' | 'footer' | 'title'> {
    blockHeight?: boolean
    embedded?: boolean
    emptyStateMessage?: string
    time?: boolean
    transactions?: TransformedPartialTransactionFragment[]
}

const TransactionTable: FC<Props> = props => {
    const router = useRouter()

    const onRowClick = useCallback(
        (e: MouseEvent<HTMLTableRowElement>) => {
            if ((e.target as HTMLElement).tagName !== 'A') {
                router.push(`/tx/${e.currentTarget.dataset.transactionHash}`)
            }
        },
        [router]
    )

    return (
        <Table
            actions={props.actions}
            className={clsx(styles.root, props.embedded && styles.embedded)}
            footer={props.footer}
            title={props.title}
            section
        >
            <thead>
                <tr>
                    <th>Tx hash</th>
                    {!props.embedded && <th>Block height</th>}
                    <th>Actions</th>
                    {props.time && <th>Time</th>}
                </tr>
            </thead>
            <tbody>
                {props.transactions?.length ? (
                    props.transactions.map(transaction => (
                        <tr
                            key={transaction.hash}
                            data-transaction-hash={transaction.hash}
                            onClick={onRowClick}
                        >
                            <td>
                                <CheckCheck
                                    color="var(--secondaryLight)"
                                    size={14}
                                />
                                <Link href={`/tx/${transaction.hash}`}>
                                    {shortenHash(transaction.hash)}
                                </Link>
                                <CopyToClipboard data={transaction.hash} />
                            </td>
                            {!props.embedded && (
                                <td>
                                    <Box
                                        color="var(--textSecondary)"
                                        size={16}
                                    />
                                    <Link
                                        href={`/block/${transaction.block.height}`}
                                    >
                                        {formatNumber(transaction.block.height)}
                                    </Link>
                                </td>
                            )}
                            <td>
                                {transaction.primaryAction && (
                                    <Pill>
                                        {formatAction(
                                            transaction.primaryAction
                                        )}
                                    </Pill>
                                )}
                                {transaction.actions.length > 1 && (
                                    <span className={styles.moreActions}>
                                        +{transaction.actions.length - 1}
                                    </span>
                                )}
                            </td>
                            {props.time && <td>{transaction.timeAgo}</td>}
                        </tr>
                    ))
                ) : (
                    <tr className={styles.empty}>
                        <td
                            colSpan={
                                4 -
                                (props.time ? 0 : 1) -
                                (props.embedded ? 1 : 0)
                            }
                        >
                            <EmptyState title="No transactions">
                                {props.emptyStateMessage}
                            </EmptyState>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default TransactionTable
