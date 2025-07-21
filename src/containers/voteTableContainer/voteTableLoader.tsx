// istanbul ignore file
import { FC } from 'react'
import { Pagination, VoteTable } from '@/components'
import { getVotes } from '@/lib/data'
import { Props } from './voteTableContainer'

const VoteTableLoader: FC<Props> = async ({
    limit,
    pagination,
    proposalId,
    ...props
}) => {
    const { total, votes } = await getVotes(proposalId, limit)

    return (
        <VoteTable
            {...props}
            footer={
                pagination ? (
                    <Pagination
                        page={(limit.offset ?? 0) / limit.length + 1}
                        totalPages={Math.ceil(total / limit.length)}
                    />
                ) : undefined
            }
            votes={votes}
        />
    )
}

export default VoteTableLoader
