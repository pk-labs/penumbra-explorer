import { ExternalLinkIcon } from 'lucide-react'
import { FC } from 'react'
import { DexPositionStatePill, TimeAgo } from '@/components'
import { TransformedDexPosition } from '@/lib/types'
import { classNames, formatNumber, shortenHash } from '@/lib/utils'
import EmptyState from '../../emptyState'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    positions: TransformedDexPosition[]
}

const DexPositionTable: FC<Props> = ({ positions, ...props }) => (
    <Table {...props}>
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
                            {position.base}/{position.quote}
                        </TableCell>
                        <TableCell className="h-20">
                            {formatNumber(position.reserve)} {position.quote}
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

export default DexPositionTable
