import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getValidatorBlocks from './getValidatorBlocks'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getValidatorBlocks', () => {
    test('returns data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            validatorDetails: {
                                last300Blocks: true,
                            },
                        },
                    }),
            }),
        })

        await expect(getValidatorBlocks('foo')).resolves.toBe(true)
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getValidatorBlocks('foo')).rejects.toBe('foo')
    })
})
