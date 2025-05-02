'use client'

import {
    Pill as PenumbraPill,
    PillProps as PenumbraPillProps,
} from '@penumbra-zone/ui/Pill'
import { FC } from 'react'

export interface Props extends PenumbraPillProps {
    className?: string
}

const Pill: FC<Props> = ({ className, ...props }) => (
    <span className={className}>
        <PenumbraPill {...props} />
    </span>
)

export default Pill
