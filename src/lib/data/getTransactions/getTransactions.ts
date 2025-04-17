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
import {
    decodeTransaction,
    findPrimaryAction,
    transactionToJson,
} from '@/lib/utils'

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

    const now = dayjs()

    const transactions = result.data.transactionsCollection.items
        .map(transaction => {
            let json
            let primaryAction
            let actionCount

            try {
                const decoded = decodeTransaction(transaction.raw)
                json = transactionToJson(decoded)
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
                json,
                primaryAction,
                timeAgo: transaction.block.createdAt
                    ? now.to(transaction.block.createdAt)
                    : undefined,
            }
        })
        .toSorted((a, b) => b.block.height - a.block.height)

    return { total: result.data.transactionsCollection.total, transactions }
}

export default getTransactions
