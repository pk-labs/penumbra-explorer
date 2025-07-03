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
    // TODO: Determine automatically by checking for http at the beginning
    externalLink?: boolean
    href?: string
    icon?: keyof typeof icons
    scroll?: boolean
}

const Button: FC<Props> = ({
    className,
    externalLink,
    href,
    icon,
    scroll,
    ...props
}) =>
    href ? (
        <Link
            className={classNames('outline-none', className)}
            href={href}
            scroll={scroll}
            target={externalLink ? '_blank' : undefined}
        >
            {/* @ts-expect-error icon typing */}
            <PenumbraButton
                icon={
                    externalLink
                        ? icons['ExternalLink']
                        : icon
                          ? icons[icon]
                          : undefined
                }
                {...props}
            />
        </Link>
    ) : (
        <span className={classNames('outline-none', className)}>
            {/* @ts-expect-error icon typing */}
            <PenumbraButton icon={icon && icons[icon]} {...props} />
        </span>
    )

export default Button
