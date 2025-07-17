'use client'

import { BoxIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import { formatNumber, shortenHash } from '@/lib/utils'
import CopyToClipboard from '../../copyToClipboard'
import { Pill } from '../../pills/pill'
import TransactionStatusPill from '../../pills/transactionStatusPill'
import TimeAgo from '../../timeAgo'
import TransactionStatusIcon from '../../transactionStatusIcon'
import { TableCell, TableRow } from '../table'

export interface Props {
    amount?: boolean
    blockHeight?: boolean
    new?: boolean
    status?: boolean
    time?: boolean
    transaction: TransformedPartialTransactionFragment
}

const TransactionTableRow: FC<Props> = props => (
    <TableRow
        className={props.new ? 'animate-new-data-bg' : undefined}
        href={`/tx/${props.transaction.hash}`}
    >
        <TableCell>
            <TransactionStatusIcon status={props.transaction.status} />
            <Link href={`/tx/${props.transaction.hash}`}>
                {shortenHash(props.transaction.hash, 16)}
            </Link>
            <CopyToClipboard text={props.transaction.hash} />
        </TableCell>
        {props.blockHeight && (
            <TableCell>
                <BoxIcon className="text-text-secondary inline" size={16} />
                <Link href={`/block/${props.transaction.blockHeight}`}>
                    {formatNumber(props.transaction.blockHeight)}
                </Link>
            </TableCell>
        )}
        {props.status && (
            <TableCell>
                <TransactionStatusPill status={props.transaction.status} />
            </TableCell>
        )}
        <TableCell>
            {props.transaction.primaryAction && (
                <Pill compact technical>
                    {props.transaction.primaryAction}
                </Pill>
            )}
            {props.transaction.actionCount > 1 && (
                <span className="text-text-secondary">
                    +{props.transaction.actionCount - 1}
                </span>
            )}
        </TableCell>
        {props.time && (
            <TableCell>
                <TimeAgo timestamp={props.transaction.timestamp} />
            </TableCell>
        )}
    </TableRow>
)

export default TransactionTableRow
