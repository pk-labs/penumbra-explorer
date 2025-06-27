import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getDexTotalExecutions from './getDexTotalExecutions'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getDexTotalExecutions', () => {
    test('returns number', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { dexStats: { totalExecutions: 99 } },
                    }),
            }),
        })

        await expect(getDexTotalExecutions()).resolves.toBe(99)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getDexTotalExecutions()).rejects.toBe('foo')
    })
})
