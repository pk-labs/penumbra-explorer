import { Clock4Icon, TimerOffIcon } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'
import { ibcConnections } from '@/lib/constants'
import { classNames, formatNumber } from '@/lib/utils'
import EmptyState from '../../emptyState'
import Pill from '../../pill'
import { Table, TableCell, TableRow } from '../table'

export interface Props {
    className?: string
}

const IbcTable: FC<Props> = props => (
    <Table className={props.className}>
        <thead>
            <TableRow>
                <TableCell header>Name</TableCell>
                <TableCell header>Client status</TableCell>
                <TableCell header>
                    Volume shielded
                    <br />
                    <span className="text-xs font-normal">Txs shielded</span>
                </TableCell>
                <TableCell header>
                    Volume unshielded
                    <br />
                    <span className="text-xs font-normal">Txs unshielded</span>
                </TableCell>
                <TableCell header>
                    Volume total
                    <br />
                    <span className="text-xs font-normal">Txs total</span>
                </TableCell>
                <TableCell header>
                    Txs pending
                    <br />
                    <span className="text-xs font-normal">Txs expired</span>
                </TableCell>
            </TableRow>
        </thead>
        <tbody>
            {ibcConnections.length ? (
                ibcConnections.map(connection => (
                    <TableRow key={connection.chainId}>
                        <TableCell>
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
                        <TableCell>
                            <Pill
                                className="capitalize"
                                context={
                                    connection.clientStatus === 'active'
                                        ? 'technical-success'
                                        : connection.clientStatus === 'frozen'
                                          ? 'technical-caution'
                                          : connection.clientStatus ===
                                              'expired'
                                            ? 'technical-destructive'
                                            : 'technical-default'
                                }
                                priority="secondary"
                            >
                                {connection.clientStatus}
                            </Pill>
                        </TableCell>
                        <TableCell>
                            <span className="text-base font-normal">
                                ${formatNumber(connection.volumeShielded)}
                            </span>
                            <br />
                            <span className="text-text-secondary">
                                {formatNumber(connection.txsShielded)}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className="text-base font-normal">
                                ${formatNumber(connection.volumeUnshielded)}
                            </span>
                            <br />
                            <span className="text-text-secondary">
                                {formatNumber(connection.txsUnshielded)}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className="text-base font-normal">
                                $
                                {formatNumber(
                                    connection.volumeShielded +
                                        connection.volumeUnshielded
                                )}
                            </span>
                            <br />
                            <span className="text-text-secondary">
                                {formatNumber(
                                    connection.txsShielded +
                                        connection.txsUnshielded
                                )}
                            </span>
                        </TableCell>
                        <TableCell>
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
                                {formatNumber(connection.txsPending)}
                            </span>
                            <span
                                className={classNames(
                                    'text-text-secondary flex items-center',
                                    'gap-1'
                                )}
                            >
                                <TimerOffIcon
                                    className="text-neutral-light"
                                    size={12}
                                />
                                {formatNumber(connection.txsPending)}
                            </span>
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={6}>
                        <EmptyState>No chains configured</EmptyState>
                    </TableCell>
                </TableRow>
            )}
        </tbody>
    </Table>
)

export default IbcTable
