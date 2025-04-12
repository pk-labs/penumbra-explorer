import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    BlocksQuery,
    BlocksQueryVariables,
    BlocksSelector,
} from '@/lib/graphql/generated/types'
import { blocksQuery } from '@/lib/graphql/queries'
import { TransformedPartialBlockFragment } from '@/lib/types'

const getBlocks = async (
    selector: BlocksSelector
): Promise<TransformedPartialBlockFragment[] | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<BlocksQuery, BlocksQueryVariables>(blocksQuery, { selector })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    const now = dayjs()

    // TODO: Extract to utils
    return result.data?.blocks
        ?.map(block => ({
            ...block,
            timeAgo: block.createdAt ? now.to(block.createdAt) : undefined,
        }))
        .toSorted((a, b) => b.height - a.height)
}

export default getBlocks
