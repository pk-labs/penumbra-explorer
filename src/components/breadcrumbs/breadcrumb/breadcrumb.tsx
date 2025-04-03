import Link from 'next/link'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

export interface Props {
    children: string
    href?: string
}

const Breadcrumb: FC<Props> = props => {
    const className = twMerge('font-heading text-3xl font-medium')

    return props.href ? (
        <Link
            className={twMerge(
                className,
                'hover:text-text-primary text-text-muted'
            )}
            href={props.href}
        >
            {props.children}
        </Link>
    ) : (
        <span className={className}>{props.children}</span>
    )
}

export default Breadcrumb
