import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

export interface Props {
    children: string
    href?: string
}

const Breadcrumb: FC<Props> = props => {
    const className = clsx('font-secondary text-3xl font-medium')

    return props.href ? (
        <Link
            className={clsx(
                className,
                'text-(--textSecondary) hover:text-(--text)'
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
