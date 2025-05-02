import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getIbcChannelPairs from './getIbcChannelPairs'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getIbcChannelPairs', () => {
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
                                {
                                    channelId: 'bar',
                                    counterpartyChannelId: 'foo',
                                },
                                {
                                    channelId: 'baz',
                                    counterpartyChannelId: null,
                                },
                            ],
                        },
                    }),
            }),
        })

        await expect(getIbcChannelPairs('foo')).resolves.toEqual([
            {
                channelId: 'foo',
                counterpartyChannelId: 'bar',
            },
            {
                channelId: 'bar',
                counterpartyChannelId: 'foo',
            },
        ])
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getIbcChannelPairs('foo')).rejects.toBe('foo')
    })
})
