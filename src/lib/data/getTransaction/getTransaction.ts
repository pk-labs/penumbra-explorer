import dayjs from '@/lib/dayjs'
import { TransformedTransactionFragment } from '@/lib/types'
import { decodeTransaction, findPrimaryAction } from '@/lib/utils'
import createGraphqlClient from '../../graphql/createGraphqlClient'
import {
    TransactionQuery,
    TransactionQueryVariables,
} from '../../graphql/generated/types'
import { transactionQuery } from '../../graphql/queries'

const getTransaction = async (
    hash: string
): Promise<null | TransformedTransactionFragment | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            TransactionQuery,
            TransactionQueryVariables
        >(transactionQuery, { hash: hash.toUpperCase() })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    if (!result.data?.transaction) {
        return
    }

    let primaryAction
    let actionCount
    let memo

    try {
        const decoded = decodeTransaction(result.data.transaction.raw)
        primaryAction = findPrimaryAction(decoded)
        actionCount = decoded.body?.actions.length
        memo = Boolean(decoded.body?.memo)
    } catch (e) {
        // istanbul ignore next
        console.error(e)
    }

    return {
        actionCount: actionCount ?? 0,
        blockHeight: result.data.transaction.block.height,
        chainId: result.data.transaction.body.parameters.chainId,
        fee: Number(result.data.transaction.body.parameters.fee.amount),
        hash: result.data.transaction.hash.toLowerCase(),
        memo: memo ?? false,
        primaryAction,
        raw: result.data.transaction.raw,
        /* eslint-disable perfectionist/sort-objects */
        rawJson: {
            hash: result.data.transaction.rawJson.hash,
            block_height: result.data.transaction.rawJson.block_height,
            index: result.data.transaction.rawJson.index,
            timestamp: result.data.transaction.rawJson.timestamp,
            transaction_view: {
                body: {
                    actions:
                        result.data.transaction.rawJson.transaction_view.body
                            .actions,
                    transactionParameters:
                        result.data.transaction.rawJson.transaction_view.body
                            .transactionParameters,
                    detectionData:
                        result.data.transaction.rawJson.transaction_view.body
                            .detectionData,
                    memo: result.data.transaction.rawJson.transaction_view.body
                        .memo,
                },
                bindingSig:
                    result.data.transaction.rawJson.transaction_view.bindingSig,
                anchor: result.data.transaction.rawJson.transaction_view.anchor,
            },
            events: result.data.transaction.rawJson.events
                .map((event: any) => ({
                    event_id: event.event_id,
                    type: event.type,
                    attributes: event.attributes,
                }))
                .toSorted((a: any, b: any) => a.event_id - b.event_id),
        },
        /* eslint-enable perfectionist/sort-objects */
        timestamp: dayjs(result.data.transaction.block.createdAt).valueOf(),
    }
}

export default getTransaction
