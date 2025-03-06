import { Transaction } from '@penumbra-zone/protobuf/penumbra/core/transaction/v1/transaction_pb'
import { TransformedTransactionFragment } from '@/lib/types'
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

    let rawDecoded

    try {
        rawDecoded = Transaction.fromBinary(
            new Uint8Array(Buffer.from(result.data.transaction.raw, 'base64'))
        ).toJson()
    } catch (e) {
        console.error(e)
        rawDecoded = { error: String(e) }
    }

    return {
        ...result.data.transaction,
        hash: result.data.transaction.hash.toLowerCase(),
        rawDecoded,
    }
}

export default loadTransaction
