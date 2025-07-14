import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ActiveProposalsQuery,
    ActiveProposalsQueryVariables,
} from '@/lib/graphql/generated/types'
import { activeProposalsQuery } from '@/lib/graphql/queries'
import { TransformedActiveProposal } from '@/lib/types'
import { transformProposalKind } from '@/lib/utils'

const getActiveProposals = async (): Promise<
    TransformedActiveProposal[] | undefined
> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            ActiveProposalsQuery,
            ActiveProposalsQueryVariables
        >(activeProposalsQuery, {})
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.activeProposals.map(proposal => ({
        ...proposal,
        kind: transformProposalKind(proposal.kind),
    }))
}

export default getActiveProposals
