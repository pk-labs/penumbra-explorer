import clsx from 'clsx'
import { Box, CheckCheck } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import { formatAction, formatNumber, shortenHash } from '@/lib/utils'
import CopyToClipboard from '../../copyToClipboard'
import EmptyState from '../../emptyState'
import Pill from '../../pill'
import { Table, TableProps, TableRow } from '../table'
import styles from './transactionTable.module.css'

interface Props extends Pick<TableProps, 'actions' | 'footer' | 'title'> {
    blockHeight?: boolean
    embedded?: boolean
    emptyStateMessage?: string
    time?: boolean
    transactions?: TransformedPartialTransactionFragment[]
}

const TransactionTable: FC<Props> = props => (
    <Table
        actions={props.actions}
        className={clsx(styles.root, props.embedded && styles.embedded)}
        footer={props.footer}
        title={props.title}
    >
        <thead>
            <TableRow>
                <th>Tx hash</th>
                {!props.embedded && <th>Block height</th>}
                <th>Actions</th>
                {props.time && <th>Time</th>}
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
                                <Box color="var(--textSecondary)" size={16} />
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
                                    {formatAction(transaction.primaryAction)}
                                </Pill>
                            )}
                            {transaction.actions.length > 1 && (
                                <span className={styles.moreActions}>
                                    +{transaction.actions.length - 1}
                                </span>
                            )}
                        </td>
                        {props.time && <td>{transaction.timeAgo}</td>}
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <td
                        colSpan={
                            4 - (props.time ? 0 : 1) - (props.embedded ? 1 : 0)
                        }
                    >
                        <EmptyState title="No transactions">
                            {props.emptyStateMessage}
                        </EmptyState>
                    </td>
                </TableRow>
            )}
        </tbody>
    </Table>
)

export default TransactionTable
