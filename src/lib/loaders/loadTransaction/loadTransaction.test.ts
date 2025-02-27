import createGraphqlClient from '../../graphql/createGraphqlClient'
import loadTransaction from './loadTransaction'

jest.mock('../../graphql/createGraphqlClient')

describe('loadTransaction', () => {
    test('returns data', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({ data: { transaction: true } }),
            }),
        })

        await expect(loadTransaction('1')).resolves.toBe(true)
    })

    test('logs error', async () => {
        ;(createGraphqlClient as jest.Mocked<any>).mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadTransaction('1')
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
