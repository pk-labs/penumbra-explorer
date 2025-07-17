import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getBlock from './getBlock'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

jest.mock('../../utils/decodeTransaction/decodeTransaction', () => () => ({
    toJson: jest.fn(),
}))

describe('getBlock', () => {
    test('returns transformed data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            block: {
                                rawJson: {
                                    events: [{ event_id: 2 }, { event_id: 1 }],
                                },
                                transactions: [{ block: {}, hash: 'FoO' }],
                            },
                        },
                    }),
            }),
        })

        await expect(getBlock(1)).resolves.toMatchObject({
            rawJson: { events: [{ event_id: 1 }, { event_id: 2 }] },
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
