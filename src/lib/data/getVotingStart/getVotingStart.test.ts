import dayjs from '@/lib/dayjs/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getVotingStart from './getVotingStart'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getVotingStart', () => {
    test('returns transformed data', async () => {
        const votingStartedTimestamp = dayjs().subtract(1, 'second')

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            proposalDetail: {
                                votingStartedBlockHeight: 123,
                                votingStartedTimestamp:
                                    votingStartedTimestamp.toISOString(),
                            },
                        },
                    }),
            }),
        })

        await expect(getVotingStart(1)).resolves.toEqual({
            blockHeight: 123,
            timestamp: votingStartedTimestamp.valueOf(),
        })
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getVotingStart(1)).rejects.toBe('foo')
    })
})
