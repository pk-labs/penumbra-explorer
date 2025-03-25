'use client'

import Link from 'next/link'
import { FC, MouseEvent, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    children?: ReactNode
    className?: string
    disabled?: boolean
    href?: string
    light?: boolean
    onClick?: (e: MouseEvent) => void
    round?: boolean
}

// TODO: Replace round prop with icon prop and implement hiding label below sm
const Button: FC<Props> = props => {
    const className = twMerge(
        'font-primary transition-background inline-flex h-8 transform-none',
        'items-center justify-center gap-1 rounded-full text-sm',
        'font-medium whitespace-nowrap text-(--text) capitalize duration-200',
        'ease-(--fastOutSlowIn) select-none',
        props.round ? 'w-8' : 'px-4',
        props.disabled
            ? 'cursor-not-allowed bg-(--surfaceDisabled) text-(--textDisabled)'
            : 'cursor-pointer hover:text-(--text) active:scale-98',
        !props.disabled && props.light
            ? 'bg-(--surfaceLight) hover:bg-(--surfaceLighter)'
            : 'bg-(--surface) hover:bg-(--surfaceLight)',
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
