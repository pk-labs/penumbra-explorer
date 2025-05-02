'use client'

import { Clock4Icon, TimerOffIcon } from 'lucide-react'
import Image from 'next/image'
import { FC, useMemo } from 'react'
import { IbcStatsQuery } from '@/lib/graphql/generated/types'
import ibc from '@/lib/ibc'
import { classNames, formatNumber } from '@/lib/utils'
import EmptyState from '../../emptyState'
import { Pill } from '../../pill'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    stats: IbcStatsQuery['ibcStats']
}

const IbcTable: FC<Props> = props => {
    const connections = useMemo(() => {
        const matches = []

        for (const connection of ibc) {
            const stats = props.stats.find(
                s => s.clientId === connection.clientId
            )

            if (stats) {
                matches.push({
                    ...connection,
                    ...stats,
                })
            }
        }

        return matches
    }, [props.stats])

    return (
        <Table
            className={props.className}
            // header={
            //     <Density compact>
            //         <SegmentedControl
            //             className="self-start"
            //             onChange={settimePeriod}
            //             value={timePeriod}
            //         >
            //             <SegmentedControl.Item style="filled" value="24h" />
            //             <SegmentedControl.Item style="filled" value="30d" />
            //             <SegmentedControl.Item style="filled" value="All" />
            //         </SegmentedControl>
            //     </Density>
            // }
        >
            <thead>
                <TableRow>
                    <TableCell className="align-baseline" header>
                        Name
                    </TableCell>
                    <TableCell className="align-baseline" header>
                        Client status
                    </TableCell>
                    <TableCell className="align-baseline" header>
                        Volume shielded
                        <br />
                        <span className="text-xs font-normal">
                            Txs shielded
                        </span>
                    </TableCell>
                    <TableCell className="align-baseline" header>
                        Volume unshielded
                        <br />
                        <span className="text-xs font-normal">
                            Txs unshielded
                        </span>
                    </TableCell>
                    <TableCell className="align-baseline" header>
                        Volume total
                        <br />
                        <span className="text-xs font-normal">Txs total</span>
                    </TableCell>
                    <TableCell className="align-baseline" header>
                        Txs pending
                        <br />
                        <span className="text-xs font-normal">Txs expired</span>
                    </TableCell>
                </TableRow>
            </thead>
            <tbody>
                {connections.length ? (
                    connections.map(connection => (
                        <TableRow
                            key={connection.chainId}
                            href={`/ibc/${connection.chainId}`}
                        >
                            <TableCell className="h-20">
                                <Image
                                    alt={connection.name}
                                    className="inline"
                                    height={32}
                                    src={connection.image}
                                    width={32}
                                />
                                <span className="font-default text-lg font-normal">
                                    {connection.name}
                                </span>
                            </TableCell>
                            <TableCell className="h-20">
                                <Pill
                                    className="capitalize"
                                    context="technical-success"
                                    priority="secondary"
                                >
                                    Active
                                </Pill>
                            </TableCell>
                            <TableCell className="h-20">
                                <div className="flex flex-col gap-2">
                                    <span className="text-base font-normal">
                                        $
                                        {formatNumber(
                                            Number(connection.shieldedVolume)
                                        )}
                                    </span>
                                    <span className="text-text-secondary">
                                        {formatNumber(
                                            connection.shieldedTxCount
                                        )}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="h-20">
                                <div className="flex flex-col gap-2">
                                    <span className="text-base font-normal">
                                        $
                                        {formatNumber(
                                            Number(connection.unshieldedVolume)
                                        )}
                                    </span>
                                    <span className="text-text-secondary">
                                        {formatNumber(
                                            connection.unshieldedTxCount
                                        )}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="h-20">
                                <div className="flex flex-col gap-2">
                                    <span className="text-base font-normal">
                                        $
                                        {formatNumber(
                                            Number(connection.shieldedVolume) +
                                                Number(
                                                    connection.unshieldedVolume
                                                )
                                        )}
                                    </span>
                                    <span className="text-text-secondary">
                                        {formatNumber(
                                            connection.shieldedTxCount +
                                                connection.unshieldedTxCount
                                        )}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="h-20">
                                <div className="flex flex-col gap-2">
                                    <span
                                        className={classNames(
                                            'flex items-center gap-1 text-base',
                                            'font-normal'
                                        )}
                                    >
                                        <Clock4Icon
                                            className="text-caution-light"
                                            size={12}
                                        />
                                        {formatNumber(
                                            connection.pendingTxCount
                                        )}
                                    </span>
                                    <span
                                        className={classNames(
                                            'text-text-secondary flex items-center',
                                            'gap-1'
                                        )}
                                    >
                                        <TimerOffIcon
                                            className="text-text-secondary"
                                            size={12}
                                        />
                                        {formatNumber(
                                            connection.expiredTxCount
                                        )}
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell className="h-20" colSpan={6}>
                            <EmptyState>No chains configured</EmptyState>
                        </TableCell>
                    </TableRow>
                )}
            </tbody>
        </Table>
    )
}

export default IbcTable
