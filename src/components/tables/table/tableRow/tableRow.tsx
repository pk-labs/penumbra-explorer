'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, ReactNode, useCallback } from 'react'
import styles from './tableRow.module.css'

export interface Props {
    children?: ReactNode
    className?: string
    href?: string
}

const TableRow: FC<Props> = props => {
    const router = useRouter()

    const onClick = useCallback(
        (e: MouseEvent) => {
            if (props.href && (e.target as HTMLElement).tagName !== 'A') {
                router.push(props.href)
            }
        },
        [props.href, router]
    )

    return (
        <tr
            className={clsx(
                styles.root,
                props.href && styles.clickable,
                props.className
            )}
            onClick={onClick}
        >
            {props.children}
        </tr>
    )
}

export default TableRow
