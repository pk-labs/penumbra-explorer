import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import { ProposalKind } from '@/lib/graphql/generated/types'
import { TransformedProposalKind } from '@/lib/types'
import getActiveProposals from './getActiveProposals'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getActiveProposals', () => {
    test('returns transformed data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            activeProposals: [
                                { kind: ProposalKind.ParameterChange },
                            ],
                        },
                    }),
            }),
        })

        await expect(getActiveProposals()).resolves.toMatchObject([
            { kind: TransformedProposalKind.ParameterChange },
        ])
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getActiveProposals()).rejects.toBe('foo')
    })
})
