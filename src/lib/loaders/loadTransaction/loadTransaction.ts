import createGraphqlClient from '../../graphql/createGraphqlClient'
import {
    TransactionQuery,
    TransactionQueryVariables,
} from '../../graphql/generated/types'
import { transactionQuery } from '../../graphql/queries'

const loadTransaction = async (hash: string) => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            TransactionQuery,
            TransactionQueryVariables
        >(transactionQuery, { hash: hash.toUpperCase() })
        .toPromise()

    if (result.error) {
        console.error(result.error)
    }

    return (
        result.data?.transaction && {
            ...result.data.transaction,
            hash: result.data.transaction.hash.toLowerCase(),
        }
    )
}

export default loadTransaction
