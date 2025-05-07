import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    CollectionLimit,
    TransactionFilter,
    TransactionsQuery,
    TransactionsQueryVariables,
} from '@/lib/graphql/generated/types'
import { transactionsQuery } from '@/lib/graphql/queries'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import { decodeTransaction, findPrimaryAction } from '@/lib/utils'

const getTransactions = async (
    limit: CollectionLimit,
    filter?: TransactionFilter
): Promise<{
    total: number
    transactions: TransformedPartialTransactionFragment[]
}> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<TransactionsQuery, TransactionsQueryVariables>(
            transactionsQuery,
            {
                filter,
                limit,
            }
        )
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data) {
        return { total: 0, transactions: [] }
    }

    const transactions = result.data.transactionsCollection.items
        .map(transaction => {
            const date = dayjs(transaction.block.createdAt)
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
                blockHeight: transaction.block.height,
                hash: transaction.hash.toLowerCase(),
                initialTimeAgo: dayjs().to(date),
                primaryAction,
                raw: transaction.raw,
                status: transaction.ibcStatus,
                timestamp: date.valueOf(),
            }
        })
        .toSorted((a, b) => b.blockHeight - a.blockHeight)

    return { total: result.data.transactionsCollection.total, transactions }
}

export default getTransactions
