import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import loadBlock from './loadBlock'

jest.mock('../../graphql/createGraphqlClient')

jest.mock('../../utils/decodeTransaction/decodeTransaction', () => () => ({
    toJson: jest.fn(),
}))

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
