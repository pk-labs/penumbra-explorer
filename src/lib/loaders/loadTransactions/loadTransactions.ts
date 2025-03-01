import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    TransactionsQuery,
    TransactionsQueryVariables,
    TransactionsSelector,
} from '@/lib/graphql/generated/types'
import { transactionsQuery } from '@/lib/graphql/queries'
import { TransformedPartialTransactionFragment } from '@/lib/types'

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

    return result.data?.transactions?.map(transaction => ({
        ...transaction,
        hash: transaction.hash.toLowerCase(),
        timeAgo: transaction.block.createdAt
            ? now.to(transaction.block.createdAt)
            : undefined,
    }))
}

export default loadTransactions
