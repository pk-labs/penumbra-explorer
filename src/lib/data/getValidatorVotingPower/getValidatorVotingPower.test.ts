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
                        data: { validatorDetails: true },
                    }),
            }),
        })

        await expect(getValidatorVotingPower('foo')).resolves.toBe(true)
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
