import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getGovParameters from './getGovParameters'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getGovParameters', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            governanceParameters: true,
                        },
                    }),
            }),
        })

        await expect(getGovParameters()).resolves.toBe(true)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getGovParameters()).rejects.toBe('foo')
    })
})
