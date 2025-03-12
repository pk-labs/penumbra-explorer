'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { FC, ReactNode, useCallback } from 'react'
import styles from './tableRow.module.css'

export interface Props {
    children?: ReactNode
    className?: string
    href?: string
}

const TableRow: FC<Props> = props => {
    const router = useRouter()

    const onClick = useCallback(() => {
        if (props.href) {
            router.push(props.href)
        }

        // if ((e.target as HTMLElement).tagName !== 'A') {
        //     router.push(`/block/${e.currentTarget.dataset.blockHeight}`)
        // }
    }, [props.href, router])

    return (
        <tr className={clsx(styles.root, props.className)} onClick={onClick}>
            {props.children}
        </tr>
    )
}

export default TableRow
