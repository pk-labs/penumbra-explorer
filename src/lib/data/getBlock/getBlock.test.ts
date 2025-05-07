import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getBlock from './getBlock'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

jest.mock('../../utils/decodeTransaction/decodeTransaction', () => () => ({
    toJson: jest.fn(),
}))

describe('getBlock', () => {
    test('returns transformed hash', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            block: {
                                rawJson: 'null',
                                transactions: [{ block: {}, hash: 'FoO' }],
                            },
                        },
                    }),
            }),
        })

        await expect(getBlock(1)).resolves.toMatchObject({
            transactions: [{ hash: 'foo' }],
        })
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })
        await expect(getBlock(1)).rejects.toBe('foo')
    })
})
