'use client'

import { Value } from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb'
import {
    ValueViewComponent,
    ValueViewComponentProps,
} from '@penumbra-zone/ui/ValueView'
import { FC } from 'react'

interface Props extends Omit<ValueViewComponentProps<'default'>, 'valueView'> {
    ammount: NonNullable<Value['amount']>
    assetId: NonNullable<Value['assetId']>
    className?: string
}

const AssetValue: FC<Props> = ({ className, ...props }) => {
    // const getMetadata = useGetMetadata(chainId)

    return (
        <div className={className}>
            <ValueViewComponent {...props} />
        </div>
    )
}

export default AssetValue
