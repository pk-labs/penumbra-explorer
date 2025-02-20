/* istanbul ignore file */
import createGraphqlClient from '../graphql/createGraphqlClient'
import { BlocksQuery, BlocksQueryVariables } from '../graphql/generated/types'
import { blocksQuery } from '../graphql/queries'

const loadBlocks = async (limit: number) => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<BlocksQuery, BlocksQueryVariables>(
            blocksQuery,
            { limit },
            {
                fetchOptions: {
                    cache: 'no-store',
                },
            }
        )
        .toPromise()

    if (result.error) {
        console.error(result.error)
    }

    return result.data?.blocks
}

export default loadBlocks
