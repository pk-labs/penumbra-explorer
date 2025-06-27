import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    DexOpenPositionsQuery,
    DexOpenPositionsQueryVariables,
} from '@/lib/graphql/generated/types'
import { dexOpenPositionsQuery } from '@/lib/graphql/queries'

const getDexOpenPositions = async (): Promise<number | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            DexOpenPositionsQuery,
            DexOpenPositionsQueryVariables
        >(dexOpenPositionsQuery, {})
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.dexStats.openPositions
}

export default getDexOpenPositions
