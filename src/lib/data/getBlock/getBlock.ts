import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import { BlockQuery, BlockQueryVariables } from '@/lib/graphql/generated/types'
import { blockQuery } from '@/lib/graphql/queries'
import { TransformedBlockFragment } from '@/lib/types'
import {
    decodeTransaction,
    findPrimaryAction,
    transformActions,
} from '@/lib/utils'

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
                let actions

                try {
                    const decoded = decodeTransaction(transaction.raw)
                    primaryAction = findPrimaryAction(decoded)
                    actions = transformActions(decoded.body?.actions)
                } catch (e) {
                    // istanbul ignore next
                    console.error(e)
                }

                return {
                    ...transaction,
                    actions: actions ?? [],
                    hash: transaction.hash.toLowerCase(),
                    primaryAction,
                }
            }),
        }
    )
}

export default getBlock
