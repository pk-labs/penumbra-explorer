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
        rawJson: JSON.parse(result.data.transaction.rawJson),
        timestamp: dayjs(result.data.transaction.block.createdAt).valueOf(),
    }
}

export default getTransaction
