import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    BlockFilter,
    BlocksQuery,
    BlocksQueryVariables,
    CollectionLimit,
} from '@/lib/graphql/generated/types'
import { blocksQuery } from '@/lib/graphql/queries'
import { TransformedPartialBlockFragment } from '@/lib/types'

const getBlocks = async (
    limit: CollectionLimit,
    filter?: BlockFilter
): Promise<{ blocks: TransformedPartialBlockFragment[]; total: number }> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<BlocksQuery, BlocksQueryVariables>(blocksQuery, {
            filter,
            limit,
        })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data) {
        return { blocks: [], total: 0 }
    }

    const blocks = result.data.blocks.items.map(block => ({
        height: block.height,
        timestamp: dayjs(block.createdAt).valueOf(),
        transactionsCount: block.transactionsCount,
    }))

    return { blocks, total: result.data.blocks.total }
}

export default getBlocks
