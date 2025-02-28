import createGraphqlClient from '../../graphql/createGraphqlClient'
import loadBlock from './loadBlock'

jest.mock('../../graphql/createGraphqlClient')

describe('loadBlock', () => {
    test('returns data with lowercase hash', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { block: { transactions: [{ hash: 'FoO' }] } },
                    }),
            }),
        })

        await expect(loadBlock(1)).resolves.toMatchObject({
            transactions: [{ hash: 'foo' }],
        })
    })

    test('logs error', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadBlock(1)
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
