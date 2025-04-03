// istanbul ignore file
import { asPublicTransactionView } from '@penumbra-zone/perspective/translators/transaction-view'
import {
    ActionView,
    MemoView,
    MemoView_Opaque,
    Transaction,
    TransactionBodyView,
    TransactionPerspective,
    TransactionView,
} from '@penumbra-zone/protobuf/penumbra/core/transaction/v1/transaction_pb'
import { TransactionId } from '@penumbra-zone/protobuf/penumbra/core/txhash/v1/txhash_pb'
import { TransactionInfo } from '@penumbra-zone/protobuf/penumbra/view/v1/view_pb'
import { actionToView } from '@/lib/utils'

// https://github.com/penumbra-zone/dex-explorer/blob/main/src/pages/inspect/tx/api/transaction.ts
const transactionToView = (
    transaction: Transaction,
    hash: string,
    blockHeight: number
): TransactionView => {
    const uint8Hash = new Uint8Array(Buffer.from(hash))

    const transactionInfo = new TransactionInfo({
        height: BigInt(blockHeight),
        id: new TransactionId({ inner: uint8Hash }),
        perspective: new TransactionPerspective({
            transactionId: new TransactionId({ inner: uint8Hash }),
        }),
        transaction,
        view: new TransactionView({
            anchor: transaction.anchor,
            bindingSig: transaction.bindingSig,
            bodyView: new TransactionBodyView({
                actionViews: (transaction.body?.actions
                    .map(actionToView)
                    .filter(Boolean) ?? []) as ActionView[],
                detectionData: transaction.body?.detectionData,
                memoView: new MemoView({
                    memoView: {
                        case: 'opaque',
                        value: new MemoView_Opaque({}),
                    },
                }),
                transactionParameters: transaction.body?.transactionParameters,
            }),
        }),
    })

    return asPublicTransactionView(transactionInfo.view)
}

export default transactionToView
