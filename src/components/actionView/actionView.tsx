'use client'

import {
    ActionView as PenumbraActionView,
    ActionViewProps as PenumbraActionViewProps,
} from '@penumbra-zone/ui/ActionView'
import { FC } from 'react'
import { useGetMetadata } from '@/lib/hooks'

interface Props extends Pick<PenumbraActionViewProps, 'action'> {
    chainId: string
    className?: string
}

const ActionView: FC<Props> = ({ chainId, className, ...props }) => {
    const getMetadata = useGetMetadata(chainId)

    return (
        <div className={className}>
            <PenumbraActionView getMetadata={getMetadata} {...props} />
        </div>
    )
}

export default ActionView
