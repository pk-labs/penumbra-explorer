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

    return result.data?.validatorsHomepage.stakingParameters.totalStaked
}

export default getActiveVotingPower
