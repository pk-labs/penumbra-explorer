/* istanbul ignore file */
import createGraphqlClient from '../graphql/createGraphqlClient'
import {
    TransactionQuery,
    TransactionQueryVariables,
} from '../graphql/generated/types'
import { transactionQuery } from '../graphql/queries'

const loadTransaction = async (id: string) => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<TransactionQuery, TransactionQueryVariables>(
            transactionQuery,
            { id },
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

    return result.data?.transaction
}

export default loadTransaction
