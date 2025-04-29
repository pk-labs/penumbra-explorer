import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import { BlockQuery, BlockQueryVariables } from '@/lib/graphql/generated/types'
import { blockQuery } from '@/lib/graphql/queries'
import { TransformedBlockFragment } from '@/lib/types'
import { decodeTransaction, findPrimaryAction } from '@/lib/utils'

const getBlock = async (
    height: number
): Promise<null | TransformedBlockFragment | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<BlockQuery, BlockQueryVariables>(blockQuery, { height })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return (
        result.data?.block && {
            ...result.data.block,
            rawJson:
                result.data.block.rawJson &&
                JSON.parse(result.data.block.rawJson),
            transactions: result.data.block.transactions.map(transaction => {
                let primaryAction
                let actionCount

                try {
                    const decoded = decodeTransaction(transaction.raw)
                    primaryAction = findPrimaryAction(decoded)
                    actionCount = decoded.body?.actions.length
                } catch (e) {
                    // istanbul ignore next
                    console.error(e)
                }

                return {
                    actionCount: actionCount ?? 0,
                    blockHeight: height,
                    hash: transaction.hash.toLowerCase(),
                    primaryAction,
                    raw: transaction.raw,
                }
            }),
        }
    )
}

export default getBlock
