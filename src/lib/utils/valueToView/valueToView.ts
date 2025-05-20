// istanbul ignore file
import { unpackIbcRelay } from '@penumbra-zone/perspective/action-view/ibc'
import {
    Denom,
    Metadata,
    Value,
    ValueView,
} from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb'
import {
    IbcRelay,
    Ics20Withdrawal,
} from '@penumbra-zone/protobuf/penumbra/core/component/ibc/v1/ibc_pb'
import { fromString } from '@penumbra-zone/types/amount'
import { ActionViewProps } from '@penumbra-zone/ui/ActionView'

type GetMetadata = ActionViewProps['getMetadata']

const valueToView = (value: Value, getMetadata?: GetMetadata) => {
    if (!getMetadata) {
        return
    }

    let asset

    switch (value.getType()) {
        case Ics20Withdrawal:
            const ics20Withdrawal = value as Ics20Withdrawal
            asset = ics20Withdrawal.denom && getMetadata(ics20Withdrawal.denom)

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
        case IbcRelay:
            const ibcRelay = value as IbcRelay
            const data = unpackIbcRelay(ibcRelay)

            if (!data?.tokenData || !data.packet) {
                return
            }

            let assetDenom = data.tokenData.denom
            asset = getMetadata(new Denom({ denom: data.tokenData.denom }))

            if (!asset) {
                const denomMatch = /\/([^/]+)$/.exec(data.tokenData.denom)

                if (
                    data.tokenData.denom === 'upenumbra' ||
                    denomMatch?.[1] === 'upenumbra'
                ) {
                    assetDenom = 'upenumbra'
                } else {
                    assetDenom =
                        data.packet.destinationPort +
                        data.packet.destinationChannel +
                        '/' +
                        (denomMatch?.[1] ?? data.tokenData.denom)
                }

                asset = getMetadata(new Denom({ denom: assetDenom }))
            }

            const amount = fromString(data.tokenData.amount)

            return new ValueView({
                valueView: {
                    case: 'knownAssetId',
                    value: {
                        amount,
                        metadata:
                            asset ??
                            new Metadata({
                                base: assetDenom,
                                denomUnits: [
                                    {
                                        denom: assetDenom,
                                        exponent: 0,
                                    },
                                ],
                                display: assetDenom,
                                symbol: data.tokenData.denom,
                            }),
                    },
                },
            })
    }
}

export default valueToView
