/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import {
    Button as PenumbraButton,
    ButtonProps as PenumbraButtonProps,
} from '@penumbra-zone/ui/Button'
import Link from 'next/link'
import { FC } from 'react'
import icons from '@/lib/icons'
import { classNames } from '@/lib/utils'

interface Props extends Omit<PenumbraButtonProps, 'icon'> {
    className?: string
    href?: string
    icon?: keyof typeof icons
}

const Button: FC<Props> = ({ className, href, icon, ...props }) =>
    href ? (
        <Link className={classNames('outline-none', className)} href={href}>
            <PenumbraButton
                // @ts-ignore
                icon={icon && icons[icon]}
                {...props}
            />
        </Link>
    ) : (
        <span className={classNames('outline-none', className)}>
            <PenumbraButton
                // @ts-ignore
                icon={icon && icons[icon]}
                {...props}
            />
        </span>
    )

export default Button
