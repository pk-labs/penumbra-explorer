import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import { VoteValue } from '@/lib/graphql/generated/types'
import getVotes from './getVotes'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getVotes', () => {
    test('returns transformed data', async () => {
        const votedAt = dayjs().subtract(1, 'second')

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            proposalDetail: {
                                votes: {
                                    items: [
                                        {
                                            effectiveVotingPower: 1,
                                            txHash: 'foo',
                                            vote: VoteValue.Yes,
                                            votedAt: votedAt.toISOString(),
                                            votingPowerPercentage: 0.5,
                                        },
                                    ],
                                    total: 1,
                                },
                            },
                        },
                    }),
            }),
        })

        await expect(getVotes(1, { length: 1 })).resolves.toMatchObject({
            total: 1,
            votes: [
                {
                    power: 1,
                    powerPercentage: 0.5,
                    timestamp: votedAt.valueOf(),
                    transactionHash: 'foo',
                    value: VoteValue.Yes,
                },
            ],
        })
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getVotes(1, { length: 1 })).rejects.toBe('foo')
    })
})
