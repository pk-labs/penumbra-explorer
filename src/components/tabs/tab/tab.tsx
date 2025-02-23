'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import styles from './tab.module.css'

export interface Props {
    children: string
    href: string
}

const Tab: FC<Props> = props => {
    const pathname = usePathname()
    const active =
        props.href === '/' ? pathname === '/' : pathname.startsWith(props.href)

    return (
        <Link
            className={clsx(styles.root, active && styles.active)}
            href={props.href}
        >
            {props.children}
        </Link>
    )
}

export default Tab
