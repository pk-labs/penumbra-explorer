'use client'

import clsx from 'clsx'
import { Check, Copy } from 'lucide-react'
import { FC, MouseEvent, useCallback, useState } from 'react'
import styles from './copyToClipboard.module.css'

interface Props {
    className?: string
    data: string
    small?: boolean
}

const CopyToClipboard: FC<Props> = props => {
    const [copied, setCopied] = useState(false)

    const onClick = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation()

            // istanbul ignore next
            if (copied) {
                return
            }

            let timeout: NodeJS.Timeout

            navigator.clipboard
                .writeText(props.data)
                .then(() => {
                    setCopied(true)
                    timeout = setTimeout(() => setCopied(false), 3000)
                })
                // istanbul ignore next
                .catch(console.error)

            return () => {
                // istanbul ignore next
                if (timeout) {
                    clearTimeout(timeout)
                }
            }
        },
        [copied, props.data]
    )

    const size = props.small ? 12 : 16

    return (
        <div
            className={clsx(
                styles.root,
                props.small && styles.small,
                copied && styles.copied,
                props.className
            )}
            onClick={onClick}
        >
            {copied ? <Check size={size} /> : <Copy size={size} />}
        </div>
    )
}

export default CopyToClipboard
