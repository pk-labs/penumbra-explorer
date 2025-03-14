import Link from 'next/link'
import { FC } from 'react'

export interface Props {
    children: string
    href?: string
}

const Breadcrumb: FC<Props> = props => {
    return props.href ? (
        <Link
            className="font-secondary text-3xl font-medium text-(--textSecondary) hover:text-(--text)"
            href={props.href}
        >
            {props.children}
        </Link>
    ) : (
        <span className="font-secondary text-3xl font-medium">
            {props.children}
        </span>
    )
}

export default Breadcrumb
