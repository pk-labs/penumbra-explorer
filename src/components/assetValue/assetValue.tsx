'use client'

import { ValueView } from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb'
import { Amount } from '@penumbra-zone/protobuf/penumbra/core/num/v1/num_pb'
import {
    ValueViewComponent,
    ValueViewComponentProps,
} from '@penumbra-zone/ui/ValueView'
import { FC, ReactNode } from 'react'
import { useAsset } from '@/lib/hooks'

interface Props
    extends Omit<ValueViewComponentProps<'default' | 'table'>, 'valueView'> {
    amount: number
    assetId: string
    className?: string
    fallback?: ReactNode
}

const AssetValue: FC<Props> = ({
    amount,
    assetId,
    className,
    fallback,
    ...props
}) => {
    const asset = useAsset(assetId)

    if (typeof asset === 'undefined') {
        return fallback
    } else if (asset === null) {
        return <span>NA</span>
    }

    const valueView = new ValueView({
        valueView: {
            case: 'knownAssetId',
            value: {
                amount: new Amount({ lo: BigInt(amount) }),
                metadata: asset,
            },
        },
    })

    return (
        <span className={className}>
            <ValueViewComponent valueView={valueView} {...props} />
        </span>
    )
}

export default AssetValue
