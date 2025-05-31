import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getValidatorVotingPower from './getValidatorVotingPower'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getValidatorVotingPower', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            validatorDetails: {
                                votingPower: 99,
                            },
                        },
                    }),
            }),
        })

        await expect(getValidatorVotingPower('foo')).resolves.toBe(99)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getValidatorVotingPower('foo')).rejects.toBe('foo')
    })
})
