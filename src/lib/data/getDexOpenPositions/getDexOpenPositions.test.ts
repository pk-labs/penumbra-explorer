import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getDexOpenPositions from './getDexOpenPositions'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getDexOpenPositions', () => {
    test('returns number', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { dexStats: { openPositions: 99 } },
                    }),
            }),
        })

        await expect(getDexOpenPositions()).resolves.toBe(99)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getDexOpenPositions()).rejects.toBe('foo')
    })
})
