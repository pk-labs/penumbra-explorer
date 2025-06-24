import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getDexTotalExecutions from './getDexTotalExecutions'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getTotalShieldedVolume', () => {
    test('returns parsed number', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { ibcTotalShieldedVolume: { value: '123' } },
                    }),
            }),
        })

        await expect(getDexTotalExecutions()).resolves.toBe(123)
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
