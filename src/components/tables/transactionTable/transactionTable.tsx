import { Box, CheckCheck } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import { formatAction, formatNumber, shortenHash } from '@/lib/utils'
import CopyToClipboard from '../../copyToClipboard'
import EmptyState from '../../emptyState'
import Pill from '../../pill'
import { Table, TableCell, TableProps, TableRow } from '../table'
import styles from './transactionTable.module.css'

interface Props extends Pick<TableProps, 'actions' | 'footer' | 'title'> {
    blockHeight?: boolean
    className?: string
    embedded?: boolean
    emptyStateMessage?: string
    time?: boolean
    transactions?: TransformedPartialTransactionFragment[]
}

const TransactionTable: FC<Props> = props => (
    <Table
        actions={props.actions}
        className={twMerge(
            styles.root,
            props.embedded && styles.embedded,
            props.className
        )}
        footer={props.footer}
        title={props.title}
    >
        <thead>
            <TableRow>
                <TableCell header>Tx hash</TableCell>
                {!props.embedded && <TableCell header>Block height</TableCell>}
                <TableCell header>Actions</TableCell>
                {props.time && <TableCell header>Time</TableCell>}
            </TableRow>
        </thead>
        <tbody>
            {props.transactions?.length ? (
                props.transactions.map(transaction => (
                    <TableRow
                        key={transaction.hash}
                        className={styles.clickableRow}
                        href={`/tx/${transaction.hash}`}
                    >
                        <TableCell>
                            <CheckCheck
                                color="var(--secondaryLight)"
                                size={14}
                            />
                            <Link href={`/tx/${transaction.hash}`}>
                                {shortenHash(transaction.hash)}
                            </Link>
                            <CopyToClipboard data={transaction.hash} />
                        </TableCell>
                        {!props.embedded && (
                            <TableCell>
                                <Box color="var(--textSecondary)" size={16} />
                                <Link
                                    href={`/block/${transaction.block.height}`}
                                >
                                    {formatNumber(transaction.block.height)}
                                </Link>
                            </TableCell>
                        )}
                        <TableCell>
                            {transaction.primaryAction && (
                                <Pill>
                                    {formatAction(transaction.primaryAction)}
                                </Pill>
                            )}
                            {transaction.actions.length > 1 && (
                                <span className={styles.moreActions}>
                                    +{transaction.actions.length - 1}
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
                            4 - (props.time ? 0 : 1) - (props.embedded ? 1 : 0)
                        }
                    >
                        <EmptyState title="No transactions">
                            {props.emptyStateMessage}
                        </EmptyState>
                    </TableCell>
                </TableRow>
            )}
        </tbody>
    </Table>
)

export default TransactionTable
