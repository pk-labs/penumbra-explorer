'use client'

import { ValueView } from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb'
import { Amount } from '@penumbra-zone/protobuf/penumbra/core/num/v1/num_pb'
import {
    ValueViewComponent,
    ValueViewComponentProps,
} from '@penumbra-zone/ui/ValueView'
import { FC, useMemo } from 'react'
import { useAsset } from '@/lib/hooks'

interface Props
    extends Omit<ValueViewComponentProps<'default' | 'table'>, 'valueView'> {
    amount: number
    assetId: string
    className?: string
}

const AssetValue: FC<Props> = ({ amount, assetId, className, ...props }) => {
    const asset = useAsset(assetId)

    const valueView = useMemo(
        () =>
            asset &&
            new ValueView({
                valueView: {
                    case: 'knownAssetId',
                    value: {
                        amount: new Amount({ lo: BigInt(amount) }),
                        metadata: asset,
                    },
                },
            }),
        [amount, asset]
    )

    if (!valueView) {
        return
    }

    return (
        <div className={className}>
            <ValueViewComponent valueView={valueView} {...props} />
        </div>
    )
}

export default AssetValue
