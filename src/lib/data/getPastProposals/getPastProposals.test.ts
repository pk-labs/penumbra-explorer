import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import { ProposalKind } from '@/lib/graphql/generated/types'
import { TransformedProposalKind } from '@/lib/types'
import getPastProposals from './getPastProposals'

jest.mock('../../graphql/createGraphqlClient')
const createGraphqlClientMock = createGraphqlClient as jest.Mocked<any>

describe('getPastProposals', () => {
    test('returns transformed data', async () => {
        const endTimestamp = dayjs().subtract(1, 'second')

        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () =>
                    Promise.resolve({
                        data: {
                            pastProposals: {
                                items: [
                                    {
                                        endTimestamp:
                                            endTimestamp.toISOString(),
                                        kind: ProposalKind.Signaling,
                                    },
                                ],
                                total: 1,
                            },
                        },
                    }),
            }),
        })

        await expect(getPastProposals({ length: 1 })).resolves.toMatchObject({
            proposals: [
                {
                    endTimestamp: endTimestamp.valueOf(),
                    kind: TransformedProposalKind.Signaling,
                },
            ],
            total: 1,
        })
    })

    test('throws error', async () => {
        createGraphqlClientMock.mockReturnValue({
            query: () => ({
                toPromise: () => Promise.resolve({ error: 'foo' }),
            }),
        })

        await expect(getPastProposals({ length: 1 })).rejects.toBe('foo')
    })
})
