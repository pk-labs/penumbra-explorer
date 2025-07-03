// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { Pagination, ProposalTable } from '@/components'
import { TransformedProposal } from '@/lib/types'
import { Props } from './proposalTableContainer'

const ProposalTableLoader: FC<Props> = async ({
    limit,
    pagination,
    ...props
}) => {
    const proposals = await new Promise<TransformedProposal[]>(resolve =>
        setTimeout(
            () => resolve([]),
            faker.number.int({ max: 3000, min: 2000 })
        )
    )

    const total = 0

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
