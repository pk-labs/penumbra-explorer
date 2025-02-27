import createGraphqlClient from '../../graphql/createGraphqlClient'
import loadTransactions from './loadTransactions'

jest.mock('../../graphql/createGraphqlClient')

describe('loadTransactions', () => {
    test('returns data', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({ data: { transactions: true } }),
            }),
        })

        await expect(loadTransactions({ latest: { limit: 1 } })).resolves.toBe(
            true
        )
    })

    test('logs error', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadTransactions({ latest: { limit: 1 } })
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
