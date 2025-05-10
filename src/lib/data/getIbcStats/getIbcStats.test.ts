import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getIbcStats from './getIbcStats'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getIbcStats', () => {
    test('returns data sorted by total transaction count', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            ibcStats: [
                                { totalTxCount: 0 },
                                { totalTxCount: 99 },
                            ],
                        },
                    }),
            }),
        })

        await expect(getIbcStats()).resolves.toEqual([
            { totalTxCount: 99 },
            { totalTxCount: 0 },
        ])
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getIbcStats()).rejects.toBe('foo')
    })
})
