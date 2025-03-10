import { TransformedTransactionFragment } from '@/lib/types'
import {
    decodeTransaction,
    findPrimaryAction,
    transactionToJson,
    transformActions,
} from '@/lib/utils'
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
        console.error(result.error)
    }

    if (!result.data?.transaction) {
        return
    }

    let json
    let primaryAction
    let actions

    try {
        const decoded = decodeTransaction(result.data.transaction.raw)
        json = transactionToJson(decoded)
        primaryAction = findPrimaryAction(decoded)
        actions = transformActions(decoded.body?.actions)
    } catch (e) {
        // istanbul ignore next
        console.error(e)
    }

    return {
        ...result.data.transaction,
        actions: actions ?? [],
        hash: result.data.transaction.hash.toLowerCase(),
        json,
        primaryAction,
    }
}

export default getTransaction
