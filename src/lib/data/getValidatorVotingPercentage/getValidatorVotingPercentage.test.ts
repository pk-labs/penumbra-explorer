import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getValidatorVotingPercentage from './getValidatorVotingPercentage'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getValidatorVotingPercentage', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            validatorDetails: {
                                votingPowerActivePercentage: 99,
                            },
                        },
                    }),
            }),
        })

        await expect(getValidatorVotingPercentage('foo')).resolves.toBe(99)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getValidatorVotingPercentage('foo')).rejects.toBe('foo')
    })
})
