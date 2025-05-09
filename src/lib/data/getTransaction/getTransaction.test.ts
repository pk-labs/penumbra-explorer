import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getTransaction from './getTransaction'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

jest.mock('../../utils/decodeTransaction/decodeTransaction', () => () => ({
    toJson: jest.fn(),
}))

describe('getTransaction', () => {
    test('transforms hash', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            transaction: {
                                block: {},
                                body: {
                                    parameters: { fee: {} },
                                },
                                hash: 'FoO',
                                rawJson: 'null',
                            },
                        },
                    }),
            }),
        })

        await expect(getTransaction('1')).resolves.toMatchObject({
            hash: 'foo',
        })
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getTransaction('1')).rejects.toBe('foo')
    })
})
