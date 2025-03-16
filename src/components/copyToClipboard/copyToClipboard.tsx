'use client'

import { CheckIcon, CopyIcon } from 'lucide-react'
import { FC, MouseEvent, useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'

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
            className={twMerge(
                'transition-background inline-flex cursor-pointer items-center',
                'justify-center rounded-lg border-1 border-transparent',
                'duration-200 ease-(--fastOutSlowIn) hover:bg-(--surfaceLight)',
                props.small ? 'p-0.5' : 'p-1',
                copied && 'animate-copy',
                props.className
            )}
            onClick={onClick}
        >
            {copied ? <CheckIcon size={size} /> : <CopyIcon size={size} />}
        </div>
    )
}

export default CopyToClipboard
