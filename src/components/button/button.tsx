'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { FC, MouseEvent, ReactNode } from 'react'
import styles from './button.module.css'

interface Props {
    children?: ReactNode
    className?: string
    href?: string
    light?: boolean
    onClick?: (e: MouseEvent) => void
}

const Button: FC<Props> = props =>
    props.href ? (
        <Link
            className={clsx(
                styles.root,
                props.light && styles.light,
                props.className
            )}
            href={props.href}
            onClick={props.onClick}
        >
            {props.children}
        </Link>
    ) : (
        <button
            className={clsx(
                styles.root,
                props.light && styles.light,
                props.className
            )}
            onClick={props.onClick}
            type="button"
        >
            {props.children}
        </button>
    )

export default Button
