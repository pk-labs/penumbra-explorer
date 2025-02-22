import createGraphqlClient from '../../graphql/createGraphqlClient'
import loadBlocks from './loadBlocks'

jest.mock('../../graphql/createGraphqlClient')

describe('loadBlocks', () => {
    test('returns data', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ data: { blocks: true } }),
            }),
        })

        await expect(loadBlocks(1)).resolves.toBe(true)
    })

    test('logs error', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadBlocks(1)
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
