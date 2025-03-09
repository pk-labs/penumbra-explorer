import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getStats from './getStats'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getStats', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { stats: true },
                    }),
            }),
        })

        await expect(getStats()).resolves.toBe(true)
    })

    test('logs error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await getStats()
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
