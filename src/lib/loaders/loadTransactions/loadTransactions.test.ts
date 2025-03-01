import createGraphqlClient from '../../graphql/createGraphqlClient'
import loadTransactions from './loadTransactions'

jest.mock('../../graphql/createGraphqlClient')

describe('loadTransactions', () => {
    test('returns data with lowercase hash', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { transactions: [{ block: {}, hash: 'FoO' }] },
                    }),
            }),
        })

        await expect(
            loadTransactions({ latest: { limit: 1 } })
        ).resolves.toMatchObject([{ hash: 'foo' }])
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
