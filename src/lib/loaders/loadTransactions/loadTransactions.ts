import createGraphqlClient from '../../graphql/createGraphqlClient'
import {
    TransactionsQuery,
    TransactionsQueryVariables,
} from '../../graphql/generated/types'
import { transactionsQuery } from '../../graphql/queries'

const loadTransactions = async (limit: number) => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            TransactionsQuery,
            TransactionsQueryVariables
        >(transactionsQuery, { limit })
        .toPromise()

    if (result.error) {
        console.error(result.error)
    }

    return result.data?.latestTransactions?.map(transaction => ({
        ...transaction,
        hash: transaction.hash.toLowerCase(),
    }))
}

export default loadTransactions
