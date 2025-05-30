import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ActiveVotingPowerQuery,
    ActiveVotingPowerQueryVariables,
} from '@/lib/graphql/generated/types'
import { activeVotingPowerQuery } from '@/lib/graphql/queries'

const getActiveVotingPower = async (): Promise<number | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            ActiveVotingPowerQuery,
            ActiveVotingPowerQueryVariables
        >(activeVotingPowerQuery, {})
        .toPromise()

    if (result.error) {
        throw result.error
    }

    // TODO: Remove parsing once receiving raw number
    const preformatted =
        result.data?.validatorsHomepage.stakingParameters.totalStaked

    return preformatted ? Number(preformatted.split(' ')[0]) : undefined
}

export default getActiveVotingPower
