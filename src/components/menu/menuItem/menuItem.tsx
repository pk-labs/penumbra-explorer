'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, MouseEvent, ReactNode, useCallback } from 'react'
import { classNames } from '@/lib/utils'

export interface Props {
    children: ReactNode
    href: string
    paths?: string[]
}

const MenuItem: FC<Props> = props => {
    const pathname = usePathname()
    const paths = props.paths ? [props.href, ...props.paths] : [props.href]

    const active =
        props.href === '/'
            ? pathname === '/'
            : paths.some(path => pathname.startsWith(path))

    // istanbul ignore next
    const onClick = useCallback((e: MouseEvent) => e.stopPropagation(), [])

    return (
        <Link
            className={classNames(
                'ease-fast-out-slow-in flex h-8 items-center gap-2 px-7',
                'text-md transition-[color,background] duration-200',
                'hover:text-text-primary hover:bg-other-tonalFill5',
                active ? 'text-text-primary' : 'text-text-secondary'
            )}
            href={props.href}
            onClick={onClick}
        >
            {props.children}
        </Link>
    )
}

export default MenuItem
