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
                        data: { blocks: [{ height: 123 }, { height: 456 }] },
                    }),
            }),
        })

        await expect(
            getBlocks({ latest: { limit: 2 } })
        ).resolves.toMatchObject([{ height: 456 }, { height: 123 }])
    })

    test('returns transformed creation date', async () => {
        const createdAt = dayjs().subtract(1, 'second').toISOString()

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { blocks: [{ createdAt }] },
                    }),
            }),
        })

        await expect(
            getBlocks({ latest: { limit: 1 } })
        ).resolves.toMatchObject([{ timeAgo: '1s ago' }])
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getBlocks({ latest: { limit: 1 } })).rejects.toBe('foo')
    })
})
