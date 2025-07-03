import { BoxIcon } from 'lucide-react'
import { FC } from 'react'
import dayjs from '@/lib/dayjs/dayjs'
import { TransformedProposal } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import EmptyState from '../../emptyState'
import ProposalOutcomePill from '../../proposalOutcomePill'
import ProposalStatePill from '../../proposalStatePill'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    proposals: TransformedProposal[]
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
                proposals.map(proposal => (
                    <TableRow key={proposal.id}>
                        <TableCell className="h-20">{proposal.id}</TableCell>
                        <TableCell className="h-20">
                            <span
                                className={classNames(
                                    'font-default inline-block max-w-60',
                                    'truncate font-normal'
                                )}
                            >
                                {proposal.title}
                            </span>
                        </TableCell>
                        <TableCell className="h-20">{proposal.type}</TableCell>
                        <TableCell className="h-20">
                            <ProposalStatePill state={proposal.state} />
                        </TableCell>
                        <TableCell className="h-20">
                            <ProposalOutcomePill outcome={proposal.outcome} />
                        </TableCell>
                        <TableCell className="h-20">
                            {formatNumber(proposal.votes)} UM
                        </TableCell>
                        <TableCell className="h-20">
                            <span className="inline-flex flex-col gap-1">
                                <span className="inline-flex items-center gap-2">
                                    <BoxIcon
                                        color="var(--color-text-secondary)"
                                        size={16}
                                    />
                                    {formatNumber(proposal.blockHeight)}
                                </span>
                                <span className="text-text-secondary text-xs">
                                    {dayjs(proposal.timestamp)
                                        .tz('UTC')
                                        .format('YYYY-MM-DD HH:mm:ss z')}
                                </span>
                            </span>
                        </TableCell>
                    </TableRow>
                ))
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
