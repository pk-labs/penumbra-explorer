// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { Pagination, ProposalTable } from '@/components'
import dayjs from '@/lib/dayjs'
import {
    ProposalOutcome,
    ProposalState,
    TransformedProposal,
} from '@/lib/types'
import { Props } from './proposalTableContainer'

const ProposalTableLoader: FC<Props> = async ({
    limit,
    pagination,
    ...props
}) => {
    const proposals = await new Promise<TransformedProposal[]>(resolve =>
        setTimeout(
            () => {
                const ids = faker.helpers
                    .uniqueArray(
                        () => faker.number.int({ max: 999, min: 1 }),
                        limit.length
                    )
                    .toSorted((a, b) => b - a)

                return resolve(
                    ids.map(id => ({
                        blockHeight: faker.number.int({
                            max: 5000000,
                            min: 4000000,
                        }),
                        id,
                        outcome: faker.helpers.arrayElement(
                            Object.values(ProposalOutcome)
                        ),
                        state: faker.helpers.arrayElement(
                            Object.values(ProposalState)
                        ),
                        timestamp: dayjs()
                            .subtract(
                                faker.number.int({ max: 60, min: 1 }),
                                'days'
                            )
                            .valueOf(),
                        title: faker.lorem.sentence({ max: 20, min: 5 }),
                        type: faker.helpers.arrayElement([
                            'Unfreeze IBC Client',
                            'Emergency',
                            'Parameter change',
                            'Upgrade plan',
                        ]),
                        votes: faker.number.int({
                            max: 20000000,
                            min: 1000000,
                        }),
                    }))
                )
            },
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
