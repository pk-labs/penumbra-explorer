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
    } else if (!result.data?.block) {
        return
    }

    let date = dayjs(result.data.block.createdAt)

    return {
        height: result.data.block.height,
        /* eslint-disable perfectionist/sort-objects */
        rawJson: {
            height: result.data.block.rawJson.height,
            chain_id: result.data.block.rawJson.chain_id,
            timestamp: result.data.block.rawJson.timestamp,
            transactions: result.data.block.rawJson.transactions,
            events: result.data.block.rawJson.events
                .map((event: any) => ({
                    event_id: event.event_id,
                    type: event.type,
                    attributes: event.attributes,
                }))
                .toSorted((a: any, b: any) => a.event_id - b.event_id),
        },
        /* eslint-enable perfectionist/sort-objects */
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
