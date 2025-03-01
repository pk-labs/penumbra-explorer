import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import loadBlocks from './loadBlocks'

jest.mock('../../graphql/createGraphqlClient')

describe('loadBlocks', () => {
    test('returns data', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ data: { blocks: [] } }),
            }),
        })

        await expect(
            loadBlocks({ latest: { limit: 1 } })
        ).resolves.toMatchObject([])
    })

    test('logs error', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadBlocks({ latest: { limit: 1 } })
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
