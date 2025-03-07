import { TransformedTransactionFragment } from '@/lib/types'
import { decodeTransaction } from '@/lib/utils'
import createGraphqlClient from '../../graphql/createGraphqlClient'
import {
    TransactionQuery,
    TransactionQueryVariables,
} from '../../graphql/generated/types'
import { transactionQuery } from '../../graphql/queries'

const loadTransaction = async (
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
        console.error(result.error)
    }

    if (!result.data?.transaction) {
        return
    }

    return {
        ...result.data.transaction,
        decoded: decodeTransaction(result.data.transaction.raw),
        hash: result.data.transaction.hash.toLowerCase(),
    }
}

export default loadTransaction
