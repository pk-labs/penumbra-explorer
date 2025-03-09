import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import loadBlocks from './loadBlocks'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('loadBlocks', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({ data: { blocks: [{ height: 99 }] } }),
            }),
        })

        await expect(
            loadBlocks({ latest: { limit: 1 } })
        ).resolves.toMatchObject([{ height: 99 }])
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
            loadBlocks({ latest: { limit: 1 } })
        ).resolves.toMatchObject([{ timeAgo: '1s ago' }])
    })

    test('logs error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadBlocks({ latest: { limit: 1 } })
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
