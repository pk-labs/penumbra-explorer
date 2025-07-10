import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { TimeAgo } from '@/components'
import { penumbraImage, placeholderAvatarImage } from '@/lib/images'
import { TransformedVote } from '@/lib/types'
import { formatNumber, shortenHash } from '@/lib/utils'
import { validatorImages } from '@/lib/validators'
import Avatar from '../../avatar'
import CopyToClipboard from '../../copyToClipboard'
import EmptyState from '../../emptyState'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    votes: TransformedVote[]
}

const VoteTable: FC<Props> = ({ votes, ...props }) => (
    <Table {...props}>
        <thead>
            <TableRow>
                <TableCell header>Name</TableCell>
                <TableCell header>Voting power</TableCell>
                <TableCell header>Vote</TableCell>
                <TableCell header>Date</TableCell>
                <TableCell header>Tx hash</TableCell>
            </TableRow>
        </thead>
        <tbody>
            {votes.length ? (
                votes.map((vote, i) => (
                    <TableRow
                        key={i}
                        href={
                            vote.validatorId && `/validator/${vote.validatorId}`
                        }
                    >
                        <TableCell className="h-15">
                            {vote.validatorId ? (
                                <>
                                    <Avatar
                                        // alt={validator.name || validator.id}
                                        alt={vote.validatorId}
                                        fallback={placeholderAvatarImage}
                                        src={validatorImages[vote.validatorId]}
                                        fallbackLetter
                                    />
                                    <Link
                                        href={`/validator/${vote.validatorId}`}
                                    >
                                        {
                                            // validator.name ||
                                            shortenHash(
                                                vote.validatorId,
                                                19,
                                                'end'
                                            )
                                        }
                                    </Link>
                                </>
                            ) : (
                                'TODO: Delegator'
                            )}
                        </TableCell>
                        <TableCell className="h-15">
                            <span className="inline-flex flex-col gap-1">
                                <span className="inline-flex items-center gap-1">
                                    <Image
                                        alt="UM"
                                        height={24}
                                        src={penumbraImage}
                                        width={24}
                                    />
                                    <span>{formatNumber(vote.power)} UM</span>
                                </span>
                                <span className="text-text-secondary ml-7 text-xs">
                                    {vote.powerPercentage.toFixed(2)}%
                                </span>
                            </span>
                        </TableCell>
                        <TableCell className="h-15">
                            {String(vote.yes)}
                        </TableCell>
                        <TableCell className="h-15">
                            <TimeAgo timestamp={vote.timestamp} />
                        </TableCell>
                        <TableCell className="h-15">
                            <Link href={`/tx/${vote.transactionHash}`}>
                                {shortenHash(vote.transactionHash, 16)}
                            </Link>
                            <CopyToClipboard text={vote.transactionHash} />
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell className="h-15" colSpan={5}>
                        <EmptyState>No votes found</EmptyState>
                    </TableCell>
                </TableRow>
            )}
        </tbody>
    </Table>
)

export default VoteTable
