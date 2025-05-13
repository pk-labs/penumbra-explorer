import Image from 'next/image'
import { FC, useMemo } from 'react'
import { defaultClientImage } from '@/lib/constants'
import { TimePeriod } from '@/lib/graphql/generated/types'
import ibc from '@/lib/ibc'
import { TransformedIbcStats } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import ClientStatusPill from '../../clientStatusPill'
import EmptyState from '../../emptyState'
import TimeAgo from '../../timeAgo'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    stats: TransformedIbcStats[]
    timePeriod?: TimePeriod
}

const IbcTable: FC<Props> = props => {
    const clients = useMemo(
        () =>
            props.stats.map(stats => {
                const client = ibc.find(c => c.id === stats.id)

                return client
                    ? {
                          ...stats,
                          ...client,
                      }
                    : {
                          ...stats,
                          id: stats.id,
                          image: undefined,
                          name: stats.id,
                          slug: stats.id,
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
                    <TableCell header>Client</TableCell>
                    <TableCell header>Client status</TableCell>
                    <TableCell header>Client ID</TableCell>
                    <TableCell header>Channel ID</TableCell>
                    <TableCell header>Last tx time</TableCell>
                    <TableCell header>Total tx count</TableCell>
                    {/*<TableCell header>Txs shielded</TableCell>*/}
                    {/*<TableCell header>Txs unshielded</TableCell>*/}
                    {/*<TableCell header>Txs total</TableCell>*/}
                    {/*<TableCell header>Txs expired</TableCell>*/}
                </TableRow>
            </thead>
            <tbody>
                {clients.length ? (
                    clients.map(client => (
                        <TableRow key={client.id} href={`/ibc/${client.slug}`}>
                            <TableCell className="h-20">
                                {client.image ? (
                                    <Image
                                        alt={client.name}
                                        className="inline"
                                        height={32}
                                        src={client.image}
                                        width={32}
                                    />
                                ) : (
                                    <span
                                        className={classNames(
                                            'inline-block h-8 w-8 rounded-full',
                                            'bg-neutral-700'
                                        )}
                                    />
                                )}
                                <span className="inline-flex flex-col">
                                    <span
                                        className={classNames(
                                            'font-default text-lg font-normal'
                                        )}
                                    >
                                        {client.name}
                                    </span>
                                    <span
                                        className={classNames(
                                            'text-text-secondary text-xs font-medium'
                                        )}
                                    >
                                        {client.id}
                                    </span>
                                </span>
                            </TableCell>
                            <TableCell className="h-20">
                                <ClientStatusPill status={client.status} />
                            </TableCell>
                            <TableCell className="h-20">
                                <span className="text-base font-normal">
                                    {client.id}
                                </span>
                            </TableCell>
                            <TableCell className="h-20">
                                {client.channelId && (
                                    <span className="text-base font-normal">
                                        {client.channelId}
                                    </span>
                                )}
                            </TableCell>
                            <TableCell className="h-20">
                                <span className="text-base font-normal">
                                    <TimeAgo
                                        initialTimeAgo={client.initialTimeAgo}
                                        timestamp={client.timestamp}
                                    />
                                </span>
                            </TableCell>
                            <TableCell className="h-20">
                                <span className="text-base font-normal">
                                    {formatNumber(client.totalTxCount)}
                                </span>
                            </TableCell>
                            {/*<TableCell className="h-20">*/}
                            {/*    <div className="flex flex-col gap-2">*/}
                            {/*        <span className="text-base font-normal">*/}
                            {/*            {formatNumber(*/}
                            {/*                connection.shieldedTxCount*/}
                            {/*            )}*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</TableCell>*/}
                            {/*<TableCell className="h-20">*/}
                            {/*    <div className="flex flex-col gap-2">*/}
                            {/*        <span className="text-base font-normal">*/}
                            {/*            {formatNumber(*/}
                            {/*                connection.unshieldedTxCount*/}
                            {/*            )}*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</TableCell>*/}
                            {/*<TableCell className="h-20">*/}
                            {/*    <div className="flex flex-col gap-2">*/}
                            {/*        <span className="text-base font-normal">*/}
                            {/*            {formatNumber(connection.totalTxCount)}*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</TableCell>*/}
                            {/*<TableCell className="h-20">*/}
                            {/*    <div className="flex flex-col gap-2">*/}
                            {/*        <span*/}
                            {/*            className={classNames(*/}
                            {/*                'text-text-secondary flex',*/}
                            {/*                'items-center gap-1 text-base',*/}
                            {/*                'font-normal'*/}
                            {/*            )}*/}
                            {/*        >*/}
                            {/*            <TimerOffIcon*/}
                            {/*                className="text-text-secondary"*/}
                            {/*                size={12}*/}
                            {/*            />*/}
                            {/*            {formatNumber(*/}
                            {/*                connection.expiredTxCount*/}
                            {/*            )}*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</TableCell>*/}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell className="h-20" colSpan={6}>
                            <EmptyState>No clients configured</EmptyState>
                        </TableCell>
                    </TableRow>
                )}
            </tbody>
        </Table>
    )
}

export default IbcTable
