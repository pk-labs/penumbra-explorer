// istanbul ignore file
import { FC } from 'react'
import { Pagination, ProposalTable } from '@/components'
import { getPastProposals } from '@/lib/data'
import { Props } from './proposalTableContainer'

const ProposalTableLoader: FC<Props> = async ({
    limit,
    pagination,
    ...props
}) => {
    const { proposals, total } = await getPastProposals(limit)

    return (
        <ProposalTable
            {...props}
            footer={
                pagination ? (
                    <Pagination
                        page={(limit.offset ?? 0) / limit.length + 1}
                        totalPages={Math.ceil(total / limit.length)}
                    />
                ) : undefined
            }
            proposals={proposals}
        />
    )
}

export default ProposalTableLoader
