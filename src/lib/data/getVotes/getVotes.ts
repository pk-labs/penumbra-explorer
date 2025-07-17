import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    CollectionLimit,
    VotesQuery,
    VotesQueryVariables,
    VoteValue,
} from '@/lib/graphql/generated/types'
import { votesQuery } from '@/lib/graphql/queries'
import { TransformedVote } from '@/lib/types'

const getVotes = async (
    proposalId: number,
    limit: CollectionLimit
): Promise<{ total: number; votes: TransformedVote[] }> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            VotesQuery,
            VotesQueryVariables
        >(votesQuery, { limit, proposalId })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data?.proposalDetail) {
        return { total: 0, votes: [] }
    }

    // TODO: Remove typecasting once schema is corrected
    const votes = result.data.proposalDetail.votes.items.map(vote => ({
        id: vote.id,
        name: vote.name,
        power: Number(vote.effectiveVotingPower),
        powerPercentage: Number(vote.votingPowerPercentage),
        timestamp: dayjs(vote.votedAt).valueOf(),
        transactionHash: vote.txHash as string,
        value: vote.vote as VoteValue,
    }))

    return { total: result.data.proposalDetail.votes.total, votes }
}

export default getVotes
