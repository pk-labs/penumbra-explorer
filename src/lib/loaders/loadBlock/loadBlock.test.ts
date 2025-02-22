import createGraphqlClient from '../../graphql/createGraphqlClient'
import loadBlock from './loadBlock'

jest.mock('../../graphql/createGraphqlClient')

describe('loadBlock', () => {
    test('retuns data', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ data: { block: true } }),
            }),
        })

        await expect(loadBlock(1)).resolves.toBe(true)
    })

    test('logs error', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadBlock(1)
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
