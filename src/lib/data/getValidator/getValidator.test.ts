import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getValidator from './getValidator'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getValidator', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: { validatorDetails: true },
                    }),
            }),
        })

        await expect(getValidator('foo')).resolves.toBe(true)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getValidator('foo')).rejects.toBe('foo')
    })
})
