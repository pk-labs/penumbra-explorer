import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import { ProposalKind } from '@/lib/graphql/generated/types'
import { TransformedProposalKind } from '@/lib/types'
import getProposal from './getProposal'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getProposal', () => {
    test('returns transformed data', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            proposalDetail: {
                                kind: ProposalKind.Emergency,
                                payload: { foo: 'bar' },
                            },
                        },
                    }),
            }),
        })

        await expect(getProposal(1)).resolves.toMatchObject({
            kind: TransformedProposalKind.Emergency,
            rawJson: { foo: 'bar' },
        })
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getProposal(1)).rejects.toBe('foo')
    })
})
