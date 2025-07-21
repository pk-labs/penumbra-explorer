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

    // return [
    //     {
    //         endBlockHeight: 5555555,
    //         id: 123,
    //         kind: TransformedProposalKind.CommunityPoolSpend,
    //         state: ProposalState.Voting,
    //         title: faker.lorem.words({ max: 10, min: 3 }),
    //     },
    // ]

    return result.data?.activeProposals.map(proposal => ({
        ...proposal,
        kind: transformProposalKind(proposal.kind),
    }))
}

export default getActiveProposals
