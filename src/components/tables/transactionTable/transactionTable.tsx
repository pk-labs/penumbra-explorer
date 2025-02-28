'use client'

import clsx from 'clsx'
import { Box, CheckCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, useCallback } from 'react'
import { PartialTransactionFragment } from '@/lib/graphql/generated/types'
import { formatAction, formatNumber, shortenHash } from '@/lib/utils'
import CopyToClipboard from '../../copyToClipboard'
import Pill from '../../pill'
import TimeAgo from '../../timeAgo'
import { Table, TableProps } from '../table'
import styles from './transactionTable.module.css'

interface Props extends Pick<TableProps, 'actions' | 'footer' | 'title'> {
    embedded?: boolean
    time?: boolean
    transactions?: PartialTransactionFragment[]
}

const TransactionTable: FC<Props> = props => {
    const router = useRouter()

    const onRowClick = useCallback(
        (e: MouseEvent<HTMLTableRowElement>) => {
            router.push(`/tx/${e.currentTarget.dataset.transactionHash}`)
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
                    <th>Block height</th>
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
                                <span>{shortenHash(transaction.hash)}</span>
                                <CopyToClipboard
                                    data={transaction.hash}
                                    iconSize={14}
                                />
                            </td>
                            <td>
                                <Box color="var(--textSecondary)" size={16} />
                                <span>
                                    {formatNumber(transaction.block.height)}
                                </span>
                            </td>
                            <td>
                                {transaction.body.actions.length > 0 && (
                                    <Pill>
                                        {formatAction(
                                            transaction.body.actions[0]
                                                .__typename
                                        )}
                                    </Pill>
                                )}
                                {transaction.body.actionsCount > 1 && (
                                    <span className={styles.moreActions}>
                                        +{transaction.body.actionsCount - 1}
                                    </span>
                                )}
                            </td>
                            {props.time && (
                                <td>
                                    <TimeAgo
                                        isoDate={transaction.block.createdAt}
                                    />
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={props.time ? 4 : 3} />
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default TransactionTable
