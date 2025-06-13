// istanbul ignore file
'use client'

import { ExternalLinkIcon } from 'lucide-react'
import { FC, useState } from 'react'
import {
    DexPositionStatePill,
    Table,
    TableCell,
    TableRow,
    TimeAgo,
} from '@/components'
import { classNames, shortenHash } from '@/lib/utils'
import EmptyState from '../../components/emptyState'
import { Props as DexTableContainerProps } from './dexTableContainer'

interface Props extends DexTableContainerProps {
    positions?: any[]
}

const DexTableUpdater: FC<Props> = props => {
    const [positions] = useState(props.positions)
    // const [blockSubscription] = useBlockUpdateSubscription({
    //     pause: !subscription,
    //     variables: { limit: limit.length },
    // })
    // const blockUpdate = blockSubscription.data?.latestBlocks

    // useEffect(() => {
    //     if (blockUpdate) {
    //         setBlocks(prev => {
    //             if (
    //                 !prev ||
    //                 prev.some(block => blockUpdate.height === block.height)
    //             ) {
    //                 return prev
    //             }
    //
    //             return [
    //                 {
    //                     height: blockUpdate.height,
    //                     timestamp: dayjs(blockUpdate.createdAt).valueOf(),
    //                     transactionsCount: blockUpdate.transactionsCount,
    //                 },
    //                 ...prev.slice(0, -1),
    //             ]
    //         })
    //     }
    // }, [blockUpdate])

    return (
        <Table className={props.className} header={props.header}>
            <thead>
                <TableRow>
                    <TableCell header>Pair</TableCell>
                    <TableCell header>Reserves</TableCell>
                    <TableCell header>State</TableCell>
                    <TableCell header>Fee tier</TableCell>
                    <TableCell header>Updated</TableCell>
                    <TableCell header>Position ID</TableCell>
                </TableRow>
            </thead>
            <tbody>
                {positions?.length ? (
                    positions.map(position => (
                        <TableRow key={position.id}>
                            <TableCell className="h-20">
                                {position.pair.left}/{position.pair.right}
                            </TableCell>
                            <TableCell className="h-20">
                                <div className="flex flex-col">
                                    {position.reserves.map(
                                        (reserve: any, i: number) => (
                                            <span key={i}>
                                                {reserve.amount}{' '}
                                                {reserve.symbol}
                                            </span>
                                        )
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="h-20">
                                <DexPositionStatePill state={position.state} />
                            </TableCell>
                            <TableCell className="h-20">
                                {position.fee.toFixed(2)}%
                            </TableCell>
                            <TableCell className="h-20">
                                <TimeAgo timestamp={position.timestamp} />
                            </TableCell>
                            <TableCell className="h-20">
                                <a
                                    className={classNames(
                                        'hover:text-text-special inline-flex',
                                        'items-center gap-1'
                                    )}
                                    href={`https://dex.penumbra.zone/inspect/lp/${position.id}`}
                                    rel="nofollow"
                                    target="_blank"
                                >
                                    {shortenHash(position.id, 9, 'end')}
                                    <ExternalLinkIcon size={16} />
                                </a>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell className="h-20" colSpan={6}>
                            <EmptyState>No positions found</EmptyState>
                        </TableCell>
                    </TableRow>
                )}
            </tbody>
        </Table>
    )
}

export default DexTableUpdater
