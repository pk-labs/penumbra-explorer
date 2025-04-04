'use client'

import { Pill as PenumbraPill, PillProps } from '@penumbra-zone/ui/Pill'
import { FC } from 'react'

interface Props extends PillProps {
    className?: string
}

const Pill: FC<Props> = ({ className, ...props }) => (
    <span className={className}>
        <PenumbraPill {...props} />
    </span>
)

export default Pill
