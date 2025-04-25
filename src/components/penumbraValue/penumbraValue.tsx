'use client'

import { Value } from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb'
import {
    ValueViewComponent,
    ValueViewComponentProps,
} from '@penumbra-zone/ui/ValueView'
import { FC } from 'react'

interface Props extends Value, ValueViewComponentProps<'default'> {
    className?: string
}

const PenumbraValue: FC<Props> = ({ className, ...props }) => {
    // const getMetadata = useGetMetadata(chainId)

    return (
        <div className={className}>
            <ValueViewComponent {...props} />
        </div>
    )
}

export default PenumbraValue
