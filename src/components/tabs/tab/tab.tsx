'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import styles from './tab.module.css'

export interface Props {
    children: string
    href: string
    paths?: string[]
}

const Tab: FC<Props> = props => {
    const pathname = usePathname()
    const paths = props.paths ? [props.href, ...props.paths] : [props.href]

    const active =
        props.href === '/'
            ? pathname === '/'
            : paths.some(path => pathname.startsWith(path))

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
