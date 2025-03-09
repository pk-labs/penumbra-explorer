import { TransformedTransactionFragment } from '@/lib/types'
import { decodeTransaction, findPrimaryAction } from '@/lib/utils'
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

    let json
    let primaryAction

    try {
        const decoded = decodeTransaction(result.data.transaction.raw)
        json = decoded.toJson() as Record<string, any>
        primaryAction = findPrimaryAction(decoded)
    } catch (e) {
        console.error(e)
    }

    return {
        ...result.data.transaction,
        hash: result.data.transaction.hash.toLowerCase(),
        json,
        primaryAction,
    }
}

export default loadTransaction
