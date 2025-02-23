'use client'

import { Box, CheckCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, useCallback } from 'react'
import { dateFormatFull } from '@/lib/constants'
import dayjs from '@/lib/dayjs'
import { TransactionFragment } from '@/lib/graphql/generated/types'
import { formatAction, formatNumber, shortenHash } from '@/lib/utils'
import CopyToClipboard from '../../copyToClipboard'
import Pill from '../../pill'
import { Table, TableProps } from '../table'
import styles from './transactionTable.module.css'

interface Props extends Pick<TableProps, 'actions' | 'className' | 'title'> {
    time?: boolean
    transactions?: TransactionFragment[]
}

const TransactionTable: FC<Props> = props => {
    const router = useRouter()

    const onRowClick = useCallback(
        (e: MouseEvent<HTMLTableRowElement>) => {
            router.push(
                `/transactions/${e.currentTarget.dataset.transactionId}`
            )
        },
        [router]
    )

    // const now = dayjs().tz(timezone)

    return (
        <Table
            actions={props.actions}
            className={styles.root}
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
            {Boolean(props.transactions?.length) && (
                <tbody>
                    {props.transactions?.map(transaction => (
                        <tr
                            key={transaction.hash}
                            data-transaction-id={transaction.hash}
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
                                // <td>
                                //     {now.to(dayjs(transaction.block.createdAt))}
                                // </td>
                                <td>
                                    {dayjs(transaction.block.createdAt).format(
                                        dateFormatFull
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            )}
        </Table>
    )
}

export default TransactionTable
