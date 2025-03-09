import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getTransaction from './getTransaction'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

jest.mock('../../utils/decodeTransaction/decodeTransaction', () => () => ({
    toJson: jest.fn(),
}))

describe('getTransaction', () => {
    test('returns transformed hash', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { transaction: { hash: 'FoO' } },
                    }),
            }),
        })

        await expect(getTransaction('1')).resolves.toMatchObject({
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

        await getTransaction('1')
        expect(consoleError).toHaveBeenCalledWith('foo')
    })
})
