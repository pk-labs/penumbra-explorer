// istanbul ignore file
import { typeRegistry } from '@penumbra-zone/protobuf'
import { Transaction } from '@penumbra-zone/protobuf/penumbra/core/transaction/v1/transaction_pb'

const transactionToJson = (transaction: Transaction) =>
    transaction.toJson({ typeRegistry }) as Record<string, any>

export default transactionToJson
