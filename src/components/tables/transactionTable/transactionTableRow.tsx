'use client'

import { BoxIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import { formatNumber, shortenHash } from '@/lib/utils'
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
    // const getMetadata = useGetMetadata()

    // const valueView = useMemo(() => {
    //     if (!props.amount) {
    //         return
    //     }
    //
    //     const transaction = decodeTransaction(props.transaction.raw)
    //
    //     const match = transaction.body?.actions.find(
    //         ({ action }) =>
    //             action.case === 'ics20Withdrawal' ||
    //             action.case === 'ibcRelayAction'
    //     )
    //
    //     if (match?.action.value) {
    //         return valueToView(match.action.value as Value, getMetadata)
    //     }
    // }, [getMetadata, props.amount, props.transaction.raw])

    return (
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
            {/*{props.amount && (*/}
            {/*    <TableCell>*/}
            {/*        {valueView && (*/}
            {/*            <AssetValue*/}
            {/*                context="table"*/}
            {/*                density="compact"*/}
            {/*                valueView={valueView}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    </TableCell>*/}
            {/*)}*/}
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
                    <TimeAgo timestamp={props.transaction.timestamp} />
                </TableCell>
            )}
        </TableRow>
    )
}

export default TransactionTableRow
