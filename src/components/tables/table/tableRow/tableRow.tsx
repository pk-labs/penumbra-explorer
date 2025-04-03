'use client'

import { useRouter } from 'next/navigation'
import { FC, MouseEvent, ReactNode, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

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
            className={twMerge(
                'border-other-tonalFill10 not-last:border-b',
                props.href &&
                    'transition-background ease-(var(--fastOutSlowIn)) ' +
                        'hover:bg-other-tonalFill5 cursor-pointer duration-200',
                props.className
            )}
            onClick={onClick}
        >
            {props.children}
        </tr>
    )
}

export default TableRow
