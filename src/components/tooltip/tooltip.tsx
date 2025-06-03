// istanbul ignore file
'use client'

import { FC, ReactNode } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { classNames } from '@/lib/utils'
import styles from './tooltip.module.css'

interface Props {
    anchorSelect: string
    children?: ReactNode
    className?: string
    open?: boolean
}

// FIXME: Backdrop blur filter not working
const Tooltip: FC<Props> = props => (
    <ReactTooltip
        anchorSelect={props.anchorSelect}
        className={classNames(styles.root, styles.override, props.className)}
        delayShow={200}
        isOpen={props.open}
        opacity={1}
        clickable
        noArrow
    >
        {props.children}
    </ReactTooltip>
)

export default Tooltip
