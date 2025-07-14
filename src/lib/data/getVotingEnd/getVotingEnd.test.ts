import dayjs from '@/lib/dayjs/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getVotingEnd from './getVotingEnd'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getVotingEnd', () => {
    test('returns transformed data', async () => {
        const votingEndedTimestamp = dayjs().add(1, 'second')

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            proposalDetail: {
                                votingEndedBlockHeight: 456,
                                votingEndedTimestamp:
                                    votingEndedTimestamp.toISOString(),
                            },
                        },
                    }),
            }),
        })

        await expect(getVotingEnd(1)).resolves.toEqual({
            blockHeight: 456,
            timestamp: votingEndedTimestamp.valueOf(),
        })
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getVotingEnd(1)).rejects.toBe('foo')
    })
})
