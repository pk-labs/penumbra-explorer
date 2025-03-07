/* istanbul ignore file */
import { Transaction } from '@penumbra-zone/protobuf/penumbra/core/transaction/v1/transaction_pb'

const decodeTransaction = (raw: string) => {
    try {
        return Transaction.fromBinary(
            new Uint8Array(Buffer.from(raw, 'base64'))
        ).toJson() as object
    } catch (e) {
        console.error(e)
    }
}

export default decodeTransaction
