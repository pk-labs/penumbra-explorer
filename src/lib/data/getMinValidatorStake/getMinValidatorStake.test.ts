import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getMinValidatorStake from './getMinValidatorStake'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getMinValidatorStake', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            validatorsHomepage: {
                                stakingParameters: {
                                    minValidatorStake: '99 UM',
                                },
                            },
                        },
                    }),
            }),
        })

        await expect(getMinValidatorStake()).resolves.toBe(99)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getMinValidatorStake()).rejects.toBe('foo')
    })
})
