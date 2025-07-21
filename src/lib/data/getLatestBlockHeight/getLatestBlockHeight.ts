import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    BlocksQuery,
    BlocksQueryVariables,
} from '@/lib/graphql/generated/types'
import { blocksQuery } from '@/lib/graphql/queries'

const getLatestBlockHeight = async (): Promise<number | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            BlocksQuery,
            BlocksQueryVariables
        >(blocksQuery, { limit: { length: 1 } })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.blocks.items[0].height
}

export default getLatestBlockHeight
