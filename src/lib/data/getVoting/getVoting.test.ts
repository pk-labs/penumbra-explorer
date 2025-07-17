import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import { ProposalOutcome, ProposalState } from '@/lib/graphql/generated/types'
import { VotingState } from '@/lib/types'
import getVoting from './getVoting'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getVoting', () => {
    describe('returns transformed data', () => {
        test('for proposal with voting state', async () => {
            createGraphqlClientMock.mockReturnValue({
                query: () => ({
                    toPromise: () =>
                        Promise.resolve({
                            data: {
                                proposalDetail: {
                                    abstainVotes: '1',
                                    abstainVotesPercentage: '1.1',
                                    noVotes: '2',
                                    noVotesPercentage: '2.2',
                                    quorum: '456',
                                    state: ProposalState.Voting,
                                    totalVotes: '789',
                                    yesVotes: '3',
                                    yesVotesPercentage: '3.3',
                                },
                            },
                        }),
                }),
            })

            await expect(getVoting(1)).resolves.toEqual({
                abstain: 1,
                abstainPercentage: 1.1,
                no: 2,
                noPercentage: 2.2,
                quorum: 456,
                state: VotingState.InProgress,
                total: 789,
                yes: 3,
                yesPercentage: 3.3,
            })
        })

        test('for proposal with outcome', async () => {
            createGraphqlClientMock.mockReturnValue({
                query: () => ({
                    toPromise: () =>
                        Promise.resolve({
                            data: {
                                proposalDetail: {
                                    abstainVotes: '1',
                                    abstainVotesPercentage: '1.1',
                                    noVotes: '2',
                                    noVotesPercentage: '2.2',
                                    outcome: ProposalOutcome.Passed,
                                    quorum: '456',
                                    totalVotes: '789',
                                    yesVotes: '3',
                                    yesVotesPercentage: '3.3',
                                },
                            },
                        }),
                }),
            })

            await expect(getVoting(1)).resolves.toEqual({
                abstain: 1,
                abstainPercentage: 1.1,
                no: 2,
                noPercentage: 2.2,
                quorum: 456,
                state: VotingState.Passed,
                total: 789,
                yes: 3,
                yesPercentage: 3.3,
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
