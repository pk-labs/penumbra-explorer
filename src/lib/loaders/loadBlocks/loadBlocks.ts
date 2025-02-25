import createGraphqlClient from '../../graphql/createGraphqlClient'
import {
    BlocksQuery,
    BlocksQueryVariables,
    BlocksSelector,
} from '../../graphql/generated/types'
import { blocksQuery } from '../../graphql/queries'

const loadBlocks = async (selector: BlocksSelector) => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<BlocksQuery, BlocksQueryVariables>(blocksQuery, { selector })
        .toPromise()

    if (result.error) {
        console.error(result.error)
    }

    return result.data?.blocks
}

export default loadBlocks
