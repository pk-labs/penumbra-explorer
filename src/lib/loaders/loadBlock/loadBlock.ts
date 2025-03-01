import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    BlockFragment,
    BlockQuery,
    BlockQueryVariables,
} from '@/lib/graphql/generated/types'
import { blockQuery } from '@/lib/graphql/queries'

const loadBlock = async (
    height: number
): Promise<BlockFragment | null | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<BlockQuery, BlockQueryVariables>(blockQuery, { height })
        .toPromise()

    if (result.error) {
        console.error(result.error)
    }

    return (
        result.data?.block && {
            ...result.data.block,
            transactions: result.data.block.transactions.map(transaction => ({
                ...transaction,
                hash: transaction.hash.toLowerCase(),
            })),
        }
    )
}

export default loadBlock
