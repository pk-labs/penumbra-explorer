import createGraphqlClient from '../../graphql/createGraphqlClient'
import {
    TransactionsQuery,
    TransactionsQueryVariables,
    TransactionsSelector,
} from '../../graphql/generated/types'
import { transactionsQuery } from '../../graphql/queries'

const loadTransactions = async (selector: TransactionsSelector) => {
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

    return result.data?.transactions
}

export default loadTransactions
