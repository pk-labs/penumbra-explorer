import dayjs from '@/lib/dayjs'
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

    if (!result.data?.block) {
        return
    }

    let date = dayjs(result.data.block.createdAt)

    return {
        height: result.data.block.height,
        rawJson:
            result.data.block.rawJson && JSON.parse(result.data.block.rawJson),
        timestamp: date.valueOf(),
        transactions: result.data.block.transactions.map(transaction => {
            date = dayjs(transaction.block.createdAt)
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
                initialTimeAgo: dayjs().to(date),
                primaryAction,
                raw: transaction.raw,
                status: transaction.ibcStatus,
                timestamp: dayjs(transaction.block.createdAt).valueOf(),
            }
        }),
    }
}

export default getBlock
