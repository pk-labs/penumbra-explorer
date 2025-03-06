import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import loadStats from './loadStats'

jest.mock('../../graphql/createGraphqlClient')

describe('loadStats', () => {
    test('returns data', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
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
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadStats()
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
