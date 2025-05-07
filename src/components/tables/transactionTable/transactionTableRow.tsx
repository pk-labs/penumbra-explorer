'use client'

import { Value } from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb'
import { BoxIcon } from 'lucide-react'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { useGetMetadata } from '@/lib/hooks'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import {
    decodeTransaction,
    formatNumber,
    shortenHash,
    valueToView,
} from '@/lib/utils'
import AssetValue from '../../assetValue'
import CopyToClipboard from '../../copyToClipboard'
import { Pill } from '../../pill'
import TimeAgo from '../../timeAgo'
import TransactionStatusIcon from '../../transactionStatusIcon'
import TransactionStatusPill from '../../transactionStatusPill'
import { TableCell, TableRow } from '../table'

export interface Props {
    amount?: boolean
    blockHeight?: boolean
    new?: boolean
    status?: boolean
    time?: boolean
    transaction: TransformedPartialTransactionFragment
}

const TransactionTableRow: FC<Props> = props => {
    const getMetadata = useGetMetadata()

    const valueView = useMemo(() => {
        if (!props.amount) {
            return
        }

        const decoded = decodeTransaction(props.transaction.raw)

        const ics20Withdrawal = decoded.body?.actions.find(
            ({ action }) => action.case === 'ics20Withdrawal'
        )

        if (ics20Withdrawal?.action.value) {
            return valueToView(
                ics20Withdrawal.action.value as Value,
                getMetadata
            )
        }
    }, [getMetadata, props.amount, props.transaction.raw])

    return (
        <TableRow
            className={props.new ? 'animate-new-data-bg' : undefined}
            href={`/tx/${props.transaction.hash}`}
        >
            <TableCell>
                <TransactionStatusIcon status={props.transaction.status} />
                <Link href={`/tx/${props.transaction.hash}`}>
                    {shortenHash(props.transaction.hash)}
                </Link>
                <CopyToClipboard text={props.transaction.hash} />
            </TableCell>
            {props.blockHeight && (
                <TableCell>
                    <BoxIcon
                        className="inline"
                        color="var(--color-text-secondary)"
                        size={16}
                    />
                    <Link href={`/block/${props.transaction.blockHeight}`}>
                        {formatNumber(props.transaction.blockHeight)}
                    </Link>
                </TableCell>
            )}
            {valueView && (
                <TableCell>
                    <AssetValue
                        context="table"
                        density="compact"
                        valueView={valueView}
                    />
                </TableCell>
            )}
            {props.status && (
                <TableCell>
                    <TransactionStatusPill status={props.transaction.status} />
                </TableCell>
            )}
            <TableCell>
                {props.transaction.primaryAction && (
                    <Pill context="technical-default">
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
                    <TimeAgo
                        initialTimeAgo={props.transaction.initialTimeAgo}
                        timestamp={props.transaction.timestamp}
                    />
                </TableCell>
            )}
        </TableRow>
    )
}

export default TransactionTableRow
