import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    VotingStartQuery,
    VotingStartQueryVariables,
} from '@/lib/graphql/generated/types'
import { votingStartQuery } from '@/lib/graphql/queries'
import { VotingTime } from '@/lib/types'

const getVotingStart = async (
    proposalId: number
): Promise<undefined | VotingTime> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            VotingStartQuery,
            VotingStartQueryVariables
        >(votingStartQuery, { proposalId })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data?.proposalDetail) {
        return
    }

    return {
        blockHeight: result.data.proposalDetail.votingStartedBlockHeight,
        timestamp: dayjs(
            result.data.proposalDetail.votingStartedTimestamp
        ).valueOf(),
    }
}

export default getVotingStart
