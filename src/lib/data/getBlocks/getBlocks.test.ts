import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getBlocks from './getBlocks'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getBlocks', () => {
    test('returns sorted by descending height', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            blocksCollection: {
                                items: [{ height: 123 }, { height: 456 }],
                            },
                        },
                    }),
            }),
        })

        await expect(getBlocks({ length: 2 })).resolves.toMatchObject({
            blocks: [{ height: 456 }, { height: 123 }],
        })
    })

    test('returns timestamp and initial time ago', async () => {
        const createdAt = dayjs().subtract(1, 'second')

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            blocksCollection: {
                                items: [{ createdAt: createdAt.toISOString() }],
                            },
                        },
                    }),
            }),
        })

        await expect(getBlocks({ length: 1 })).resolves.toMatchObject({
            blocks: [
                {
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

        await expect(getBlocks({ length: 1 })).rejects.toBe('foo')
    })
})
