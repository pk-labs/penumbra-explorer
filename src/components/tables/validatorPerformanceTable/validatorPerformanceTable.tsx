import Image from 'next/image'
import { FC } from 'react'
import { penumbra } from '@/lib/images'
import { classNames, formatNumber, shortenHash } from '@/lib/utils'
import EmptyState from '../../emptyState'
import TimeAgo from '../../timeAgo'
import ValidatorStatusBonding from '../../validatorStatusBonding'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    validators: any[]
}

const ValidatorPerformanceTable: FC<Props> = ({ validators, ...props }) => (
    <Table {...props}>
        <thead>
            <TableRow>
                <TableCell header>Name</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Voting power</TableCell>
                <TableCell header>Uptime %</TableCell>
                <TableCell header>Defined</TableCell>
                <TableCell header>Commission</TableCell>
            </TableRow>
        </thead>
        <tbody>
            {validators.length ? (
                validators.map((validator, i) => (
                    <TableRow key={i} href={`/validators/${validator.hash}`}>
                        <TableCell className="h-15">
                            <img
                                alt="Validator avatar"
                                className="inline rounded-full"
                                height={32}
                                src="https://image-cdn.solana.fm/images/?imageUrl=https://bafkreihcgrvcp4ze7jjcgblux56idqnqbapmnqm2yc7ky5j6fpaonqtbdu.ipfs.nftstorage.link"
                                width={32}
                            />
                            <span>{shortenHash(validator.hash, 'end')}</span>
                        </TableCell>
                        <TableCell className="h-15">
                            <ValidatorStatusBonding
                                bonding={validator.bonding}
                                status={validator.status}
                            />
                        </TableCell>
                        <TableCell className="h-15">
                            <span className="inline-flex flex-col gap-1">
                                <span className="inline-flex items-center gap-1">
                                    <Image
                                        alt="UM"
                                        height={24}
                                        src={penumbra}
                                        width={24}
                                    />
                                    <span>
                                        {formatNumber(validator.votingPower)} UM
                                    </span>
                                </span>
                                <span className="text-text-secondary ml-7 text-xs">
                                    {validator.votingPowerPercentage.toFixed(2)}
                                    %
                                </span>
                            </span>
                        </TableCell>
                        <TableCell className="h-15">
                            <span
                                className={classNames(
                                    validator.uptime === 100
                                        ? 'text-success-light'
                                        : validator.uptime > 5
                                          ? 'text-caution-light'
                                          : 'text-destructive-light'
                                )}
                            >
                                {validator.uptime.toFixed(2)}%
                            </span>
                        </TableCell>
                        <TableCell className="h-15">
                            <TimeAgo
                                initialTimeAgo={validator.initialTimeAgo}
                                timestamp={validator.timestamp}
                            />
                        </TableCell>
                        <TableCell className="h-15">
                            {validator.commission}%
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell className="h-15" colSpan={6}>
                        <EmptyState>No validators found</EmptyState>
                    </TableCell>
                </TableRow>
            )}
        </tbody>
    </Table>
)

export default ValidatorPerformanceTable
