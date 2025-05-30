import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getValidatorParameters from './getValidatorParameters'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getValidatorParameters', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            validatorsHomepage: { stakingParameters: true },
                        },
                    }),
            }),
        })

        await expect(getValidatorParameters()).resolves.toBe(true)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getValidatorParameters()).rejects.toBe('foo')
    })
})
