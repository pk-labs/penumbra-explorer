import { TransformedTransactionFragment } from '@/lib/types'
import { decodeTransaction, findPrimaryAction } from '@/lib/utils'
import createGraphqlClient from '../../graphql/createGraphqlClient'
import {
    TransactionQuery,
    TransactionQueryVariables,
} from '../../graphql/generated/types'
import { transactionQuery } from '../../graphql/queries'

const getTransaction = async (
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
        throw result.error
    }

    if (!result.data?.transaction) {
        return
    }

    let primaryAction
    let actionCount
    let memo

    try {
        const decoded = decodeTransaction(result.data.transaction.raw)
        primaryAction = findPrimaryAction(decoded)
        actionCount = decoded.body?.actions.length
        memo = Boolean(decoded.body?.memo)
    } catch (e) {
        // istanbul ignore next
        console.error(e)
    }

    return {
        ...result.data.transaction,
        actionCount: actionCount ?? 0,
        hash: result.data.transaction.hash.toLowerCase(),
        memo: memo ?? false,
        primaryAction,
        rawJson: JSON.parse(result.data.transaction.rawJson),
    }
}

export default getTransaction
