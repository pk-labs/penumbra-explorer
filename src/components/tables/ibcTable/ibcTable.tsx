import Link from 'next/link'
import { FC, useMemo } from 'react'
import ibc from '@/lib/ibc'
import { placeholderAvatarImage } from '@/lib/images'
import { TransformedIbcStats } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import Avatar from '../../avatar'
import EmptyState from '../../emptyState'
import ClientStatusPill from '../../pills/clientStatusPill'
import TimeAgo from '../../timeAgo'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    stats: TransformedIbcStats[]
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
                          chainId: stats.id,
                          id: stats.id,
                          image: undefined,
                          name: 'Unknown',
                          slug: stats.id,
                      }
            }),
        [props.stats]
    )

    return (
        <Table className={props.className}>
            <thead>
                <TableRow>
                    <TableCell header>Name</TableCell>
                    <TableCell header>Client status</TableCell>
                    <TableCell header>Client ID</TableCell>
                    <TableCell header>Channel ID</TableCell>
                    <TableCell header>Last tx time</TableCell>
                    <TableCell header>Total tx count</TableCell>
                </TableRow>
            </thead>
            <tbody>
                {clients.length ? (
                    clients.map(client => (
                        <TableRow key={client.id} href={`/ibc/${client.slug}`}>
                            <TableCell className="h-20">
                                <Avatar
                                    alt={client.name}
                                    fallback={placeholderAvatarImage}
                                    src={client.image}
                                />
                                <span className="inline-flex flex-col">
                                    <Link
                                        className={classNames(
                                            'font-default text-lg font-normal'
                                        )}
                                        href={`/ibc/${client.slug}`}
                                    >
                                        {client.name}
                                    </Link>
                                    {client.chainId !== client.id && (
                                        <span
                                            className={classNames(
                                                'text-text-secondary text-xs',
                                                'font-medium'
                                            )}
                                        >
                                            {client.chainId}
                                        </span>
                                    )}
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
                                    <TimeAgo timestamp={client.timestamp} />
                                </span>
                            </TableCell>
                            <TableCell className="h-20">
                                <span className="text-base font-normal">
                                    {formatNumber(client.totalTxCount)}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell className="h-20" colSpan={6}>
                            <EmptyState>No clients found</EmptyState>
                        </TableCell>
                    </TableRow>
                )}
            </tbody>
        </Table>
    )
}

export default IbcTable
