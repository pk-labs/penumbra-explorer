import { BoxIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import dayjs from '@/lib/dayjs/dayjs'
import { TransformedPastProposal } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import EmptyState from '../../emptyState'
import ProposalOutcomePill from '../../pills/proposalOutcomePill'
import ProposalStatePill from '../../pills/proposalStatePill'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    proposals: TransformedPastProposal[]
}

const ProposalTable: FC<Props> = ({ proposals, ...props }) => (
    <Table {...props}>
        <thead>
            <TableRow>
                <TableCell header>#</TableCell>
                <TableCell header>Title</TableCell>
                <TableCell header>Type</TableCell>
                <TableCell header>State</TableCell>
                <TableCell header>Outcome</TableCell>
                <TableCell header>Total votes</TableCell>
                <TableCell header>Voting ended</TableCell>
            </TableRow>
        </thead>
        <tbody>
            {proposals?.length ? (
                proposals.map(proposal => {
                    const href = `/proposal/${proposal.id}`

                    return (
                        <TableRow key={proposal.id} href={href}>
                            <TableCell className="h-20">
                                <Link href={href}>{proposal.id}</Link>
                            </TableCell>
                            <TableCell className="h-20 whitespace-normal">
                                <Link
                                    className={classNames(
                                        'font-default line-clamp-2 max-w-80',
                                        'font-normal'
                                    )}
                                    href={href}
                                >
                                    {proposal.title}
                                </Link>
                            </TableCell>
                            <TableCell className="h-20">
                                {proposal.kind}
                            </TableCell>
                            <TableCell className="h-20">
                                <ProposalStatePill state={proposal.state} />
                            </TableCell>
                            <TableCell className="h-20">
                                <ProposalOutcomePill
                                    outcome={proposal.outcome}
                                />
                            </TableCell>
                            <TableCell className="h-20">
                                {formatNumber(proposal.totalVotes)} UM
                            </TableCell>
                            <TableCell className="h-20">
                                <span className="inline-flex flex-col gap-1">
                                    <span className="inline-flex items-center gap-2">
                                        <BoxIcon
                                            className="text-text-secondary"
                                            size={16}
                                        />
                                        {formatNumber(proposal.endBlockHeight)}
                                    </span>
                                    <span className="text-text-secondary text-xs">
                                        {dayjs(proposal.endTimestamp)
                                            .tz('UTC')
                                            .format('YYYY-MM-DD HH:mm:ss z')}
                                    </span>
                                </span>
                            </TableCell>
                        </TableRow>
                    )
                })
            ) : (
                <TableRow>
                    <TableCell className="h-20" colSpan={7}>
                        <EmptyState>No proposals found</EmptyState>
                    </TableCell>
                </TableRow>
            )}
        </tbody>
    </Table>
)

export default ProposalTable
