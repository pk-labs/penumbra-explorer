import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ProposalQuery,
    ProposalQueryVariables,
} from '@/lib/graphql/generated/types'
import { proposalQuery } from '@/lib/graphql/queries'
import { TransformedProposal } from '@/lib/types'
import { transformProposalKind } from '@/lib/utils'

const getProposal = async (
    id: number
): Promise<TransformedProposal | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<ProposalQuery, ProposalQueryVariables>(proposalQuery, { id })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data?.proposalDetail) {
        return
    }

    const { kind, payload, ...proposal } = result.data.proposalDetail

    const {
        description: payloadDescription,
        id: payloadId,
        title: payloadTitle,
        ...remainingPayload
    } = payload

    return {
        ...proposal,
        kind: transformProposalKind(kind),
        /* eslint-disable perfectionist/sort-objects */
        rawJson: {
            id: payloadId,
            title: payloadTitle,
            description: payloadDescription,
            ...remainingPayload,
        },
        /* eslint-enable perfectionist/sort-objects */
    }
}

export default getProposal
