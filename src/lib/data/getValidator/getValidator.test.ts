import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getValidator from './getValidator'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getValidator', () => {
    test('returns transformed data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            validatorDetails: {
                                bondingState: 'BONDING_STATE_ENUM_BONDED',
                                id: 'foo',
                                state: 'VALIDATOR_STATE_ENUM_ACTIVE',
                            },
                        },
                    }),
            }),
        })

        await expect(getValidator('foo')).resolves.toEqual({
            bonding: 'Bonded',
            id: 'foo',
            status: 'Active',
        })
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
