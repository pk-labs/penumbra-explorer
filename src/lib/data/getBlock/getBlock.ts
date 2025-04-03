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
        console.error(result.error)
    }

    return (
        result.data?.block && {
            ...result.data.block,
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
                    ...transaction,
                    actionCount: actionCount ?? 0,
                    hash: transaction.hash.toLowerCase(),
                    primaryAction,
                }
            }),
        }
    )
}

export default getBlock
