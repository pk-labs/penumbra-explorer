import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import loadTransaction from './loadTransaction'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

jest.mock('../../utils/decodeTransaction/decodeTransaction', () => () => ({
    toJson: jest.fn(),
}))

describe('loadTransaction', () => {
    test('returns transformed hash', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { transaction: { hash: 'FoO' } },
                    }),
            }),
        })

        await expect(loadTransaction('1')).resolves.toMatchObject({
            hash: 'foo',
        })
    })

    test('logs error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        const consoleError = jest.spyOn(console, 'error').mockImplementation()

        await loadTransaction('1')
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
