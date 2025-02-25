'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { FC, MouseEvent, ReactNode } from 'react'
import styles from './button.module.css'

interface Props {
    children?: ReactNode
    className?: string
    disabled?: boolean
    href?: string
    light?: boolean
    onClick?: (e: MouseEvent) => void
}

const Button: FC<Props> = props => {
    const className = clsx(
        styles.root,
        props.light && styles.light,
        props.disabled && styles.disabled,
        props.className
    )

    return props.href ? (
        <Link className={className} href={props.href} onClick={props.onClick}>
            {props.children}
        </Link>
    ) : (
        <button
            className={className}
            disabled={props.disabled}
            onClick={props.onClick}
            type="button"
        >
            {props.children}
        </button>
    )
}

export default Button
