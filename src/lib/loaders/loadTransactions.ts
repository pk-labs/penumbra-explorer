/* istanbul ignore file */
import createGraphqlClient from '../graphql/createGraphqlClient'
import {
    TransactionsQuery,
    TransactionsQueryVariables,
} from '../graphql/generated/types'
import { transactionsQuery } from '../graphql/queries'

const loadTransactions = async (limit: number) => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<TransactionsQuery, TransactionsQueryVariables>(
            transactionsQuery,
            { limit },
            {
                fetchOptions: {
                    cache: 'no-store',
                },
            }
        )
        .toPromise()

    if (result.error) {
        console.error(result.error)
    }

    return result.data?.latestTransactions
}

export default loadTransactions
