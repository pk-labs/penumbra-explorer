'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

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
            className={twMerge(
                'relative flex h-full items-center',
                'bg-radial-[50%_100%_at_50%_100%] from-[rgba(186,77,20,0.35))]',
                'from-0% to-[rgba(186,77,20,0)] to-95% bg-no-repeat px-4',
                'text-sm font-medium transition-[color,background-position]',
                'duration-200 before:absolute before:bottom-[4px]',
                'before:left-1/2 before:h-[2px] before:-translate-x-1/2',
                'before:bg-primary-main',
                'before:transition-[width,transform] before:duration-200',
                'hover:text-text-primary before:ease-(--fastOutSlowIn)',
                active
                    ? 'text-text-primary bg-[0px_0px] before:w-[calc(100%-16px)]'
                    : 'text-text-secondary bg-[0px_36px] before:w-0'
            )}
            href={props.href}
        >
            {props.children}
        </Link>
    )
}

export default Tab
