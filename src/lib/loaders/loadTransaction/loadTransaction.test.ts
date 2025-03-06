import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import loadTransaction from './loadTransaction'

jest.mock(
    '@penumbra-zone/protobuf/penumbra/core/transaction/v1/transaction_pb',
    () => ({
        Transaction: {
            fromBinary: () => ({
                toJson: () => ({}),
            }),
        },
    })
)

jest.mock('../../graphql/createGraphqlClient')

describe('loadTransaction', () => {
    test('returns data with lowercase hash', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { transaction: { hash: 'FoO', raw: 'bar' } },
                    }),
            }),
        })

        await expect(loadTransaction('1')).resolves.toMatchObject({
            hash: 'foo',
        })
    })

    test('logs error', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadTransaction('1')
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
