import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getIbcStats from './getIbcStats'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getIbcStats', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { ibcStats: true },
                    }),
            }),
        })

        await expect(getIbcStats()).resolves.toBe(true)
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
