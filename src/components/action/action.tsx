'use client'

import { ActionView, ActionViewProps } from '@penumbra-zone/ui/ActionView'
import { FC } from 'react'
import { useGetMetadata } from '@/lib/hooks'

interface Props extends Pick<ActionViewProps, 'action'> {
    className?: string
}

const Action: FC<Props> = ({ className, ...props }) => {
    const getMetadata = useGetMetadata()

    return (
        <div className={className}>
            <ActionView getMetadata={getMetadata} {...props} />
        </div>
    )
}

export default Action
