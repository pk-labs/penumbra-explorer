import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    IbcStatsQuery,
    IbcStatsQueryVariables,
    TimePeriod,
} from '@/lib/graphql/generated/types'
import { ibcStatsQuery } from '@/lib/graphql/queries'
import { TransformedIbcStats } from '@/lib/types'

const getIbcStats = async (args?: {
    clientId?: string
    timePeriod?: TimePeriod
}): Promise<TransformedIbcStats[] | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<IbcStatsQuery, IbcStatsQueryVariables>(ibcStatsQuery, {
            ...args,
        })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.ibcStats.map(stats => {
        const { lastUpdated, ...props } = stats

        return {
            ...props,
            timestamp: dayjs(lastUpdated).valueOf(),
        }
    })
}

export default getIbcStats
