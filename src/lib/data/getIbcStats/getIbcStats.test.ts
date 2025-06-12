import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getIbcStats from './getIbcStats'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getIbcStats', () => {
    test('returns transformed data', async () => {
        const lastUpdated = dayjs().subtract(1, 'second')

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            ibcStats: [
                                { lastUpdated: lastUpdated.toISOString() },
                            ],
                        },
                    }),
            }),
        })

        await expect(getIbcStats()).resolves.toMatchObject([
            {
                timestamp: lastUpdated.valueOf(),
            },
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
