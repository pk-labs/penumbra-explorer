'use client'

import { ActionView, ActionViewProps } from '@penumbra-zone/ui/ActionView'
import { FC } from 'react'
import { useGetMetadata } from '@/lib/hooks'

interface Props extends Pick<ActionViewProps, 'action'> {
    chainId: string
    className?: string
}

const PenumbraAction: FC<Props> = ({ chainId, className, ...props }) => {
    const getMetadata = useGetMetadata(chainId)

    return (
        <div className={className}>
            <ActionView getMetadata={getMetadata} {...props} />
        </div>
    )
}

export default PenumbraAction
