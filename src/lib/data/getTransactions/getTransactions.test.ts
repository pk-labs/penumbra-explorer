import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getTransactions from './getTransactions'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

jest.mock('../../utils/decodeTransaction/decodeTransaction', () => () => ({
    toJson: jest.fn(),
}))

describe('getTransactions', () => {
    test('returns transformed data', async () => {
        const createdAt = dayjs().subtract(1, 'second')

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            transactions: {
                                items: [
                                    {
                                        block: {
                                            createdAt: createdAt.toISOString(),
                                        },
                                        hash: 'FoO',
                                    },
                                ],
                            },
                        },
                    }),
            }),
        })

        await expect(getTransactions({ length: 1 })).resolves.toMatchObject({
            transactions: [
                {
                    hash: 'foo',
                    initialTimeAgo: '1s ago',
                    timestamp: createdAt.valueOf(),
                },
            ],
        })
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getTransactions({ length: 1 })).rejects.toBe('foo')
    })
})
