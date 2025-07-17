import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getLatestBlockHeight from './getLatestBlockHeight'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getLatestBlockHeight', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            blocks: {
                                items: [{ height: 123 }],
                            },
                        },
                    }),
            }),
        })

        await expect(getLatestBlockHeight()).resolves.toBe(123)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getLatestBlockHeight()).rejects.toBe('foo')
    })
})
