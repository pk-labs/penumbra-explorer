import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    VotingEndQuery,
    VotingEndQueryVariables,
} from '@/lib/graphql/generated/types'
import { votingEndQuery } from '@/lib/graphql/queries'
import { VotingTime } from '@/lib/types'

const getVotingEnd = async (
    proposalId: number
): Promise<undefined | VotingTime> => {
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
        blockHeight: result.data.proposalDetail.votingEndedBlockHeight,
        timestamp: dayjs(
            result.data.proposalDetail.votingEndedTimestamp
        ).valueOf(),
    }
}

export default getVotingEnd
