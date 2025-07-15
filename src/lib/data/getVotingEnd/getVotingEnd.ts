import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ProposalState,
    VotingEndQuery,
    VotingEndQueryVariables,
} from '@/lib/graphql/generated/types'
import { votingEndQuery } from '@/lib/graphql/queries'
import { VotingEnd } from '@/lib/types'

const getVotingEnd = async (
    proposalId: number
): Promise<undefined | VotingEnd> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            VotingEndQuery,
            VotingEndQueryVariables
        >(votingEndQuery, { proposalId })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data?.proposalDetail) {
        return
    }

    return {
        endBlockHeight: result.data.proposalDetail.votingEndedBlockHeight,
        startBlockHeight: result.data.proposalDetail.votingStartedBlockHeight,
        timestamp: dayjs(
            result.data.proposalDetail.votingEndedTimestamp
        ).valueOf(),
        votingInProgress:
            result.data.proposalDetail.state === ProposalState.Voting,
    }
}

export default getVotingEnd
