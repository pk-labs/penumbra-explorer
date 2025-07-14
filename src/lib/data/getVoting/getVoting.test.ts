import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import { ProposalOutcome } from '@/lib/graphql/generated/types'
import { VotingState } from '@/lib/types'
import getVoting from './getVoting'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getVoting', () => {
    describe('returns transformed data', () => {
        test('for proposal with outcome', async () => {
            createGraphqlClientMock.mockReturnValue({
                query: () => ({
                    toPromise: () =>
                        Promise.resolve({
                            data: {
                                proposalDetail: {
                                    abstainVotes: 1,
                                    noVotes: 2,
                                    outcome: ProposalOutcome.Passed,
                                    quorum: 456,
                                    yesVotes: 3,
                                },
                            },
                        }),
                }),
            })

            await expect(getVoting(1)).resolves.toEqual({
                abstain: 1,
                no: 2,
                quorum: 456,
                state: VotingState.Passed,
                yes: 3,
            })
        })

        test('for proposal without outcome', async () => {
            createGraphqlClientMock.mockReturnValue({
                query: () => ({
                    toPromise: () =>
                        Promise.resolve({
                            data: {
                                proposalDetail: {
                                    abstainVotes: 1,
                                    noVotes: 2,
                                    quorum: 456,
                                    yesVotes: 3,
                                },
                            },
                        }),
                }),
            })

            await expect(getVoting(1)).resolves.toEqual({
                abstain: 1,
                no: 2,
                quorum: 456,
                state: VotingState.InProgress,
                yes: 3,
            })
        })
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getVoting(1)).rejects.toBe('foo')
    })
})
