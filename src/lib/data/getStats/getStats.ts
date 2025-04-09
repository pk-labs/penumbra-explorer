import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import { StatsQuery, StatsQueryVariables } from '@/lib/graphql/generated/types'
import { statsQuery } from '@/lib/graphql/queries'

const getStats = async (): Promise<StatsQuery['stats'] | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<StatsQuery, StatsQueryVariables>(statsQuery, {})
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.stats
}

export default getStats
