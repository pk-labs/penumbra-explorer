import { TimerOffIcon } from 'lucide-react'
import Image from 'next/image'
import { FC, useMemo } from 'react'
import { defaultChainImage } from '@/lib/constants'
import { IbcStatsQuery, TimePeriod } from '@/lib/graphql/generated/types'
import ibc from '@/lib/ibc'
import { classNames, formatNumber } from '@/lib/utils'
import ClientStatusPill from '../../clientStatusPill'
import EmptyState from '../../emptyState'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    stats: IbcStatsQuery['ibcStats']
    timePeriod?: TimePeriod
}

const IbcTable: FC<Props> = props => {
    const connections = useMemo(
        () =>
            props.stats
                .toSorted(
                    (a, b) =>
                        b.shieldedTxCount +
                        b.unshieldedTxCount -
                        (a.shieldedTxCount + a.unshieldedTxCount)
                )
                .map(connection => {
                    const chain = ibc.find(
                        c => c.clientId === connection.clientId
                    )

                    return chain
                        ? {
                              ...connection,
                              ...chain,
                          }
                        : {
                              ...connection,
                              chainId: connection.clientId,
                              image: defaultChainImage,
                              name: connection.clientId,
                              slug: connection.clientId,
                          }
                }),
        [props.stats]
    )

    return (
        <Table
            className={props.className}
            // header={<TimePeriodSelector timePeriod={props.timePeriod} />}
        >
            <thead>
                <TableRow>
                    <TableCell header>Name</TableCell>
                    <TableCell header>Client status</TableCell>
                    <TableCell header>Txs shielded</TableCell>
                    <TableCell header>Txs unshielded</TableCell>
                    <TableCell header>Txs total</TableCell>
                    <TableCell header>Txs expired</TableCell>
                </TableRow>
            </thead>
            <tbody>
                {connections.length ? (
                    connections.map(connection => (
                        <TableRow
                            key={connection.chainId}
                            href={`/ibc/${connection.slug}`}
                        >
                            <TableCell className="h-20">
                                <Image
                                    alt={connection.name}
                                    className="inline"
                                    height={32}
                                    src={connection.image}
                                    width={32}
                                />
                                <span className="inline-flex flex-col">
                                    <span
                                        className={classNames(
                                            'font-default text-lg font-normal'
                                        )}
                                    >
                                        {connection.name}
                                    </span>
                                    <span
                                        className={classNames(
                                            'text-text-secondary text-xs font-medium'
                                        )}
                                    >
                                        {connection.clientId}
                                    </span>
                                </span>
                            </TableCell>
                            <TableCell className="h-20">
                                <ClientStatusPill status={connection.status} />
                            </TableCell>
                            <TableCell className="h-20">
                                <div className="flex flex-col gap-2">
                                    <span className="text-base font-normal">
                                        {formatNumber(
                                            connection.shieldedTxCount
                                        )}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="h-20">
                                <div className="flex flex-col gap-2">
                                    <span className="text-base font-normal">
                                        {formatNumber(
                                            connection.unshieldedTxCount
                                        )}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="h-20">
                                <div className="flex flex-col gap-2">
                                    <span className="text-base font-normal">
                                        {formatNumber(connection.totalTxCount)}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="h-20">
                                <div className="flex flex-col gap-2">
                                    <span
                                        className={classNames(
                                            'text-text-secondary flex',
                                            'items-center gap-1 text-base',
                                            'font-normal'
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
