import dayjs from 'dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import getValidatorActiveSince from './getValidatorActiveSince'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getValidatorActiveSince', () => {
    test('returns transformed data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            validatorDetails: {
                                activeSince: dayjs().subtract(5, 'days'),
                            },
                        },
                    }),
            }),
        })

        await expect(getValidatorActiveSince('foo')).resolves.toBe('5d ago')
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getValidatorActiveSince('foo')).rejects.toBe('foo')
    })
})
