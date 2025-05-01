import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    IbcStatsQuery,
    IbcStatsQueryVariables,
} from '@/lib/graphql/generated/types'
import { ibcStatsQuery } from '@/lib/graphql/queries'
import { TimePeriod } from '@/lib/types'

const getIbcStats = async (args?: {
    clientId?: string
    timePeriod?: TimePeriod
}): Promise<IbcStatsQuery['ibcStats'] | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<IbcStatsQuery, IbcStatsQueryVariables>(ibcStatsQuery, {
            ...args,
        })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.ibcStats
}

export default getIbcStats
