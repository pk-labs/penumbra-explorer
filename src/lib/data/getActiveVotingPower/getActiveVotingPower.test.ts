import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getActiveVotingPower from './getActiveVotingPower'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getActiveVotingPower', () => {
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

        await expect(getActiveVotingPower()).resolves.toBe(99)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getActiveVotingPower()).rejects.toBe('foo')
    })
})
