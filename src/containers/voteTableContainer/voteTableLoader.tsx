// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { Pagination, VoteTable } from '@/components'
import dayjs from '@/lib/dayjs/dayjs'
import { TransformedVote } from '@/lib/types'
import { Props } from './voteTableContainer'

const VoteTableLoader: FC<Props> = async ({ limit, pagination, ...props }) => {
    const votes = await new Promise<TransformedVote[]>(resolve =>
        setTimeout(
            () => {
                const ids = Array.from({ length: limit.length }).map(
                    faker.string.uuid
                )

                return resolve(
                    ids.map(id => ({
                        id,
                        power: faker.number.int({
                            max: 2000000,
                            min: 100000,
                        }),
                        powerPercentage: faker.number.float({
                            max: 10,
                            min: 0.5,
                        }),
                        timestamp: dayjs()
                            .subtract(
                                faker.number.int({ max: 60, min: 1 }),
                                'days'
                            )
                            .valueOf(),
                        transactionHash: faker.helpers.arrayElement([
                            'bbbc3c48c0e2d2eaaeca149c7df2255c72deeaeb44e5e9f711474e3f94fc9924',
                            'b4b27affee81ea70ca51f84ed43092b6094587c46d938eb607791dfd49a1fd97',
                            'fe98df67d0e3d623346482b20a879be3b66602182e8eca3c9ffc6886c82c09b0',
                            '70a23bd54e5f10ceeddae8c3dcd10c30dfefded2fd4c6e74eec4421a848f1a17',
                            'a1bee6e55a17882b3a3f15f3b0115557691aee1ab60dc4d44a1bb542cdb619a4',
                        ]),
                        validator: faker.datatype.boolean()
                            ? faker.helpers.arrayElement([
                                  {
                                      id: 'penumbravalid1gjdvn0u85rgldqk5adfexn6n4y8d2m3tfla54sc4gu95xwpzssxsjutk7u',
                                      name: 'Starling Cybernetics 🌙',
                                  },
                                  {
                                      id: 'penumbravalid1ar6hyxmvy0em86nclqgxc4qlauj9ct747g4dsx8tn6wthg9nuvrq099640',
                                      name: 'rotko.net',
                                  },
                                  {
                                      id: 'penumbravalid1ezmxdhvygazd25cw5wy9hnsfh6ujy9tnnaxgkjayucf9vkf2uuzqp773fv',
                                      name: '🐹 Quokka Stake',
                                  },
                                  {
                                      id: 'penumbravalid10e6zuet6usvyv967e97etrnwtr7fxw40an5epyvnu72fyn353vrq2z6q0l',
                                      name: '✅IONode Vietnam 🚀',
                                  },
                                  {
                                      id: 'penumbravalid14clrf3u5y63939pw5a0u9eqx8femp4m69naujg77avse3m9t2v8qe5sv4t',
                                      name: 'XPool',
                                  },
                              ])
                            : undefined,
                        yes: faker.datatype.boolean(),
                    }))
                )
            },
            faker.number.int({ max: 2000, min: 1000 })
        )
    )

    const total = 0

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
