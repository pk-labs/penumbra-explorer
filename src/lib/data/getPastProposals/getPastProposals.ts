import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    CollectionLimit,
    PastProposalsQuery,
    PastProposalsQueryVariables,
} from '@/lib/graphql/generated/types'
import { pastProposalsQuery } from '@/lib/graphql/queries'
import { TransformedPastProposal } from '@/lib/types'
import { transformProposalKind } from '@/lib/utils'

const getPastProposals = async (
    limit: CollectionLimit
): Promise<{ proposals: TransformedPastProposal[]; total: number }> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            PastProposalsQuery,
            PastProposalsQueryVariables
        >(pastProposalsQuery, { limit })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data) {
        return { proposals: [], total: 0 }
    }

    const proposals = result.data.pastProposals.items.map(proposal => ({
        ...proposal,
        endTimestamp: dayjs(proposal.endTimestamp).valueOf(),
        kind: transformProposalKind(proposal.kind),
    }))

    return { proposals, total: result.data.pastProposals.total }
}

export default getPastProposals
