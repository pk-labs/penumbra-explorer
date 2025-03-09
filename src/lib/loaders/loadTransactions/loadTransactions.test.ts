import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import loadTransactions from './loadTransactions'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

jest.mock('../../utils/decodeTransaction/decodeTransaction', () => () => ({
    toJson: jest.fn(),
}))

describe('loadTransactions', () => {
    test('returns transformed hash', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            transactions: [{ block: {}, hash: 'FoO' }],
                        },
                    }),
            }),
        })

        await expect(
            loadTransactions({ latest: { limit: 1 } })
        ).resolves.toMatchObject([{ hash: 'foo' }])
    })

    test('returns transformed creation date', async () => {
        const createdAt = dayjs().subtract(1, 'second').toISOString()

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            transactions: [
                                { block: { createdAt }, hash: 'foo' },
                            ],
                        },
                    }),
            }),
        })

        await expect(
            loadTransactions({ latest: { limit: 1 } })
        ).resolves.toMatchObject([{ hash: 'foo', timeAgo: '1s ago' }])
    })

    test('logs error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadTransactions({ latest: { limit: 1 } })
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
