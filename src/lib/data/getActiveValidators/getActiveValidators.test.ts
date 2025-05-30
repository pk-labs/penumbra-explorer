import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getActiveValidators from './getActiveValidators'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getActiveValidators', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            validatorsHomepage: {
                                stakingParameters: true,
                            },
                        },
                    }),
            }),
        })

        await expect(getActiveValidators()).resolves.toBe(true)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getActiveValidators()).rejects.toBe('foo')
    })
})
