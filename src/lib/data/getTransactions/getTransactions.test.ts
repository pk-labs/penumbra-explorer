import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getTransactions from './getTransactions'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

jest.mock('../../utils/decodeTransaction/decodeTransaction', () => () => ({
    toJson: jest.fn(),
}))

describe('getTransactions', () => {
    test('returns transformed hash', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            transactionsCollection: {
                                items: [{ block: {}, hash: 'FoO' }],
                            },
                        },
                    }),
            }),
        })

        await expect(getTransactions({ length: 1 })).resolves.toMatchObject({
            transactions: [{ hash: 'foo' }],
        })
    })

    test('returns timestamp and initial time ago', async () => {
        const createdAt = dayjs().subtract(1, 'second')

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            transactionsCollection: {
                                items: [
                                    {
                                        block: {
                                            createdAt: createdAt.toISOString(),
                                        },
                                        hash: 'foo',
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
                    initialTimeAgo: '1s ago',
                    timestamp: createdAt.valueOf(),
                },
            ],
        })
    })

    test('returns sorted by descending block height', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            transactionsCollection: {
                                items: [
                                    { block: { height: 123 }, hash: 'older' },
                                    { block: { height: 456 }, hash: 'newer' },
                                ],
                            },
                        },
                    }),
            }),
        })

        await expect(getTransactions({ length: 2 })).resolves.toMatchObject({
            transactions: [{ hash: 'newer' }, { hash: 'older' }],
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
