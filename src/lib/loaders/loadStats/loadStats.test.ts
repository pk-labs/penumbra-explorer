import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import loadStats from './loadStats'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('loadStats', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { stats: true },
                    }),
            }),
        })

        await expect(loadStats()).resolves.toBe(true)
    })

    test('logs error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadStats()
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
