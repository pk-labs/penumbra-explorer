import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getValidators from './getValidators'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getValidators', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { validatorsHomepage: { validators: [] } },
                    }),
            }),
        })

        await expect(getValidators()).resolves.toEqual([])
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getValidators()).rejects.toBe('foo')
    })
})
