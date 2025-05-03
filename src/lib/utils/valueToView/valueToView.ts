// istanbul ignore file
import {
    Value,
    ValueView,
} from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb'
import { Ics20Withdrawal } from '@penumbra-zone/protobuf/penumbra/core/component/ibc/v1/ibc_pb'
import { ActionViewProps } from '@penumbra-zone/ui/ActionView'

type GetMetadata = ActionViewProps['getMetadata']

const valueToView = (value: Value, getMetadata?: GetMetadata) => {
    if (!getMetadata) {
        return
    }

    switch (value.getType()) {
        case Ics20Withdrawal:
            const ics20Withdrawal = value as Ics20Withdrawal

            const asset =
                ics20Withdrawal.denom && getMetadata(ics20Withdrawal.denom)

            if (asset) {
                return new ValueView({
                    valueView: {
                        case: 'knownAssetId',
                        value: {
                            amount: value.amount,
                            metadata: asset,
                        },
                    },
                })
            } else {
                return new ValueView({
                    valueView: {
                        case: 'unknownAssetId',
                        value: {
                            amount: value.amount,
                        },
                    },
                })
            }
    }
}

export default valueToView
