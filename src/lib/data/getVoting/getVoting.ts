import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ProposalOutcome,
    VotingQuery,
    VotingQueryVariables,
} from '@/lib/graphql/generated/types'
import { votingQuery } from '@/lib/graphql/queries'
import { TransformedVoting, VotingState } from '@/lib/types'

const getVoting = async (
    proposalId: number
): Promise<TransformedVoting | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<VotingQuery, VotingQueryVariables>(votingQuery, { proposalId })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data?.proposalDetail) {
        return
    }

    let state: VotingState

    switch (result.data.proposalDetail.outcome) {
        case ProposalOutcome.Passed:
            state = VotingState.Passed
            break
        case ProposalOutcome.Failed:
            state = VotingState.Failed
            break
        case ProposalOutcome.Slashed:
            state = VotingState.Slashed
            break
        default:
            state = VotingState.InProgress
            break
    }

    return {
        abstain: Math.round(result.data.proposalDetail.abstainVotes),
        no: Math.round(result.data.proposalDetail.noVotes),
        quorum: Math.round(result.data.proposalDetail.quorum),
        state,
        yes: Math.round(result.data.proposalDetail.yesVotes),
    }
}

export default getVoting
