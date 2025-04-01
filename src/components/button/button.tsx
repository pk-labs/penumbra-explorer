/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import {
    Button as PenumbraButton,
    ButtonProps as PenumbraButtonProps,
} from '@penumbra-zone/ui/Button'
import Link from 'next/link'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import icons from '@/lib/icons'

interface Props extends Omit<PenumbraButtonProps, 'icon'> {
    className?: string
    href?: string
    icon?: keyof typeof icons
}

const Button: FC<Props> = ({ className, href, icon, ...props }) =>
    href ? (
        <Link className={twMerge('outline-none', className)} href={href}>
            <PenumbraButton
                // @ts-ignore
                icon={icon && icons[icon]}
                {...props}
            />
        </Link>
    ) : (
        <span className={twMerge('outline-none', className)}>
            <PenumbraButton
                // @ts-ignore
                icon={icon && icons[icon]}
                {...props}
            />
        </span>
    )

export default Button
