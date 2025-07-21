'use client'

import {
    Button as PenumbraButton,
    ButtonProps as PenumbraButtonProps,
} from '@penumbra-zone/ui/Button'
import Link from 'next/link'
import { FC } from 'react'
import icons from '@/lib/icons'
import { classNames } from '@/lib/utils'
import styles from './button.module.css'

interface Props extends Omit<PenumbraButtonProps, 'icon'> {
    className?: string
    fullWidth?: boolean
    href?: string
    icon?: keyof typeof icons
    scroll?: boolean
}

const Button: FC<Props> = ({
    className,
    fullWidth,
    href,
    icon,
    scroll,
    ...props
}) => {
    const combinedClassName = classNames(
        styles.root,
        fullWidth && styles.fullWidth,
        className
    )

    if (href) {
        const externalLink = href.startsWith('http')

        return (
            <Link
                className={combinedClassName}
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
        )
    }

    return (
        <span className={combinedClassName}>
            {/* @ts-expect-error icon typing */}
            <PenumbraButton icon={icon && icons[icon]} {...props} />
        </span>
    )
}
export default Button
