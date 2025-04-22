import Image from 'next/image'
import { FC } from 'react'
import { ibcConnections } from '@/lib/constants'
import EmptyState from '../../emptyState'
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
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
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
