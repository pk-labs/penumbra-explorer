import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    TransactionsQuery,
    TransactionsQueryVariables,
    TransactionsSelector,
} from '@/lib/graphql/generated/types'
import { transactionsQuery } from '@/lib/graphql/queries'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import {
    decodeTransaction,
    findPrimaryAction,
    transformActions,
} from '@/lib/utils'

const loadTransactions = async (
    selector: TransactionsSelector
): Promise<TransformedPartialTransactionFragment[] | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            TransactionsQuery,
            TransactionsQueryVariables
        >(transactionsQuery, { selector })
        .toPromise()

    if (result.error) {
        console.error(result.error)
    }

    const now = dayjs()

    return result.data?.transactions?.map(transaction => {
        let json
        let primaryAction
        let actions

        try {
            const decoded = decodeTransaction(transaction.raw)
            json = decoded.toJson() as Record<string, any>
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
            json,
            primaryAction,
            timeAgo: transaction.block.createdAt
                ? now.to(transaction.block.createdAt)
                : undefined,
        }
    })
}

export default loadTransactions
