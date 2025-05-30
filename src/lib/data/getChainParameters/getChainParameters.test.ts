import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getChainParameters from './getChainParameters'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getChainParameters', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { validatorsHomepage: { chainParameters: true } },
                    }),
            }),
        })

        await expect(getChainParameters()).resolves.toBe(true)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getChainParameters()).rejects.toBe('foo')
    })
})
