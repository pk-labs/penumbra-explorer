'use client'

import {
    ValueViewComponent,
    ValueViewComponentProps,
} from '@penumbra-zone/ui/ValueView'
import { FC } from 'react'

interface Props extends ValueViewComponentProps<'default'> {
    className?: string
}

const AssetValue: FC<Props> = ({ className, ...props }) => (
    <div className={className}>
        <ValueViewComponent {...props} />
    </div>
)

export default AssetValue
