import { ExternalLinkIcon } from 'lucide-react'
import { FC } from 'react'
import { DexPositionStatePill, TimeAgo } from '@/components'
import { TransformedDexPosition } from '@/lib/types'
import { classNames, shortenHash } from '@/lib/utils'
import AssetPair from '../../assetPair'
import AssetValue from '../../assetValue'
import EmptyState from '../../emptyState'
import Skeleton from '../../skeleton'
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
                            <AssetPair
                                baseAssetId={position.baseAssetId}
                                fallback={
                                    <span className="inline-flex items-center gap-2">
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <Skeleton className="h-5 w-14" />
                                    </span>
                                }
                                quoteAssetId={position.quoteAssetId}
                                size="lg"
                            />
                        </TableCell>
                        <TableCell className="h-20">
                            <span className="inline-flex flex-col gap-1">
                                <AssetValue
                                    amount={position.baseReserve}
                                    assetId={position.baseAssetId}
                                    context="table"
                                    density="compact"
                                    fallback={
                                        <Skeleton className="mb-1 h-5 w-23" />
                                    }
                                    showIcon={false}
                                />
                                <AssetValue
                                    amount={position.quoteReserve}
                                    assetId={position.quoteAssetId}
                                    context="table"
                                    density="compact"
                                    fallback={<Skeleton className="h-5 w-23" />}
                                    showIcon={false}
                                />
                            </span>
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
