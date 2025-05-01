import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getIbcChannelPair from './getIbcChannelPair'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getIbcChannelPair', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            ibcChannelPairsByClientId: [
                                {
                                    channelId: 'foo',
                                    counterpartyChannelId: 'bar',
                                },
                            ],
                        },
                    }),
            }),
        })

        await expect(getIbcChannelPair('foo')).resolves.toEqual({
            channelId: 'foo',
            counterpartyChannelId: 'bar',
        })
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getIbcChannelPair('foo')).rejects.toBe('foo')
    })
})
